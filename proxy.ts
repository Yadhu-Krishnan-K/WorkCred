import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;
  

  // Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }


  // Candidate protection
  if (pathname.startsWith("/home/candidate")) {
    if (token.role !== "CANDIDATE") {
      return NextResponse.redirect(new URL("/login/candidate", req.url));
    }
  }

  if (pathname.startsWith("/home/enrolled")) {
    if (token.role !== "CANDIDATE") {
      return NextResponse.redirect(new URL("/login/candidate", req.url));
    }
  }

  // Company protection
  if (pathname.startsWith("/home/company")) {
    if (token.role !== "COMPANY") {
      return NextResponse.redirect(new URL("/login/company", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};
