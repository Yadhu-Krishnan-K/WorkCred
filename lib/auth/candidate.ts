import { NextRequest, NextResponse } from "next/server";
import { isApi } from "./shared";

export function handleCandidate(req: NextRequest, pathname: string, token: any) {
  const isCandidatePath =
    pathname.startsWith("/home/candidate") ||
    pathname.startsWith("/home/enrolled") ||
    pathname.startsWith("/profile/candidate");

  if (!isCandidatePath) return null;

  if (token.role !== "CANDIDATE") {
    return isApi(pathname)
      ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
      : NextResponse.redirect(new URL("/login/candidate", req.url));
  }

  if (token.isBlocked || !token.isVerified) {
    return NextResponse.redirect(
      new URL("/login/candidate?error=restricted", req.url)
    );
  }

  return null;
}