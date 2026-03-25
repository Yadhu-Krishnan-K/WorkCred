import { NextRequest, NextResponse } from "next/server";
import { isApi } from "./shared";

export function handleCompany(req: NextRequest, pathname: string, token: any) {
  if (!pathname.startsWith("/home/company")) return null;

  if (token.role !== "COMPANY") {
    return isApi(pathname)
      ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
      : NextResponse.redirect(new URL("/login/company", req.url));
  }

  if (token.isBlocked || !token.isVerified) {
    return NextResponse.redirect(
      new URL("/login/company?error=restricted", req.url)
    );
  }

  return null;
}