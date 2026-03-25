import { NextResponse } from "next/server";

export const clearCookies = (res: NextResponse) => {
  ["next-auth.session-token", "__Secure-next-auth.session-token"].forEach(c =>
    res.cookies.set(c, "", { maxAge: 0 })
  );
  return res;
};

export const isApi = (path: string) => path.startsWith("/api");
export const isAuthApi = (path: string) => path.startsWith("/api/auth");

export const isLoginPage = (path: string) =>
  path.startsWith("/login") || path.startsWith("/admin/login");