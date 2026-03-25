import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { isApi, isAuthApi, isLoginPage } from "@/lib/auth/shared";
import { handleAdmin } from "@/lib/auth/admin";
import { handleCompany } from "@/lib/auth/company";
import { handleCandidate } from "@/lib/auth/candidate";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // ✅ allow nextauth
  if (isAuthApi(pathname)) return NextResponse.next();

  // ❌ not logged in
  if (!token) {
    if (isApi(pathname)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (pathname.startsWith("/home/company")) {
      return NextResponse.redirect(new URL("/login/company", req.url));
    }

    return NextResponse.redirect(new URL("/login/candidate", req.url));
  }

  // 🔁 redirect logged-in user away from login
  if (isLoginPage(pathname)) {
    if (token.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (token.role === "COMPANY") {
      return NextResponse.redirect(new URL("/home/company", req.url));
    }

    if (token.role === "CANDIDATE") {
      const dest = token.stream ? "/home/enrolled" : "/home/candidate";
      return NextResponse.redirect(new URL(dest, req.url));
    }
  }

  // 🎯 role-specific handlers
  const handlers = [
    handleAdmin(req, pathname, token.role),
    handleCompany(req, pathname, token),
    handleCandidate(req, pathname, token),
  ];

  const response = handlers.find(Boolean);
  if (response) return response;

  return NextResponse.next();
}