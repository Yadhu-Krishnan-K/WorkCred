import { NextRequest, NextResponse } from "next/server";
import { isApi } from "./shared";

export function handleAdmin(req: NextRequest, pathname: string, role: string) {
  if (!pathname.startsWith("/admin")) return null;

  if (role !== "ADMIN") {
    return isApi(pathname)
      ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
      : NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return null; // allowed
}