// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { NextRequest } from "next/server";
// import { connectDB } from "@/lib/db";

// // Models
// import Candidate from "@/model/candidatemodel";
// import Company from "@/model/companymodel";
// import { Admin } from "./model/adminModel";

// // 🔥 Clear auth cookies
// const clearAuthCookies = (response: NextResponse) => {
//   response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
//   response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });
//   response.cookies.set("next-auth.callback-url", "", { maxAge: 0 });
//   return response;
// };

// // 🔥 Role Config (clean & scalable)
// const roleConfig = {
//   ADMIN: {
//     model: Admin,
//     login: "/admin/login",
//     dashboard: "/admin/dashboard",
//     checkBlocked: false,
//     checkVerified: false,
//   },
//   COMPANY: {
//     model: Company,
//     login: "/login/company",
//     dashboard: "/home/company",
//     checkBlocked: true,
//     checkVerified: true,
//   },
//   CANDIDATE: {
//     model: Candidate,
//     login: "/login/candidate",
//     dashboard: "/home/candidate",
//     checkBlocked: true,
//     checkVerified: true,
//   },
// };

// export async function proxy(req: NextRequest) {
//   const token = await getToken({ req });
//   const { pathname } = req.nextUrl;

//   const isApiRoute = pathname.startsWith("/api");
//   const isNextAuthApi = pathname.startsWith("/api/auth");

//   const isAuthPage =
//     pathname.startsWith("/admin/login") ||
//     pathname.startsWith("/login/company") ||
//     pathname.startsWith("/login/candidate");

//   // ✅ Allow NextAuth routes
//   if (isNextAuthApi) return NextResponse.next();

//   // =========================================================
//   // 🔥 AUTHENTICATED USER CHECK (DB BASED)
//   // =========================================================
//   if (token?.email && token?.role) {
//     const config = roleConfig[token.role as keyof typeof roleConfig];
//     if (!config) return NextResponse.next();

//     await connectDB();

//     const user = await config.model.findOne({ email: token.email }).lean();
//     const redirectPath = config.login;

//     // 🚫 BLOCKED
//     if (config.checkBlocked && user?.isBlocked) {
//       if (isApiRoute) {
//         return clearAuthCookies(
//           NextResponse.json({ error: "Account blocked" }, { status: 403 })
//         );
//       }

//       if (isAuthPage) return NextResponse.next();

//       return clearAuthCookies(
//         NextResponse.redirect(
//           new URL(`${redirectPath}?error=blocked`, req.url)
//         )
//       );
//     }

//     // 🚫 NOT VERIFIED
//     if (config.checkVerified && !user?.isVerified) {
//       if (isApiRoute) {
//         return clearAuthCookies(
//           NextResponse.json(
//             { error: "Account not verified" },
//             { status: 403 }
//           )
//         );
//       }

//       if (isAuthPage) return NextResponse.next();

//       return clearAuthCookies(
//         NextResponse.redirect(
//           new URL(`${redirectPath}?error=not_verified`, req.url)
//         )
//       );
//     }
//   }

//   // =========================================================
//   // 🔁 LOGGED-IN USERS ACCESSING LOGIN PAGE
//   // =========================================================
//   if (token && isAuthPage) {
//     const config = roleConfig[token.role as keyof typeof roleConfig];
//     const destination = config?.dashboard || "/";
//     return NextResponse.redirect(new URL(destination, req.url));
//   }

//   // =========================================================
//   // 🌐 PUBLIC ROUTES
//   // =========================================================
//   if (isAuthPage) return NextResponse.next();

//   // =========================================================
//   // ❌ NOT LOGGED IN
//   // =========================================================
//   if (!token) {
//     if (isApiRoute) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     if (pathname.startsWith("/admin")) {
//       return NextResponse.redirect(new URL("/admin/login", req.url));
//     }

//     if (pathname.startsWith("/home/company")) {
//       return NextResponse.redirect(new URL("/login/company", req.url));
//     }

//     return NextResponse.redirect(
//       new URL("/login/candidate", req.url)
//     );
//   }

//   // =========================================================
//   // 🔐 ROLE-BASED ACCESS CONTROL
//   // =========================================================
//   const role = token.role as string;

//   if (pathname.startsWith("/admin") && role !== "ADMIN") {
//     return isApiRoute
//       ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
//       : NextResponse.redirect(new URL("/admin/login", req.url));
//   }

//   if (
//     pathname.startsWith("/home/company") &&
//     role !== "COMPANY"
//   ) {
//     return isApiRoute
//       ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
//       : NextResponse.redirect(new URL("/login/company", req.url));
//   }

//   const isCandidatePath =
//     pathname.startsWith("/home/candidate") ||
//     pathname.startsWith("/home/enrolled") ||
//     pathname.startsWith("/profile/candidate");

//   if (isCandidatePath && role !== "CANDIDATE") {
//     return isApiRoute
//       ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
//       : NextResponse.redirect(
//         new URL("/login/candidate", req.url)
//       );
//   }

//   return NextResponse.next();
// }

// // =========================================================
// // 📡 ROUTE MATCHER
// // =========================================================
// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/api/admin/:path*",
//     "/home/:path*",
//     "/profile/:path*",
//     "/login/:path*",
//   ],
// };
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// 🔥 Clear auth cookies
const clearAuthCookies = (response: NextResponse) => {
  response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
  response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });
  response.cookies.set("next-auth.callback-url", "", { maxAge: 0 });
  return response;
};

// 🔥 Role Config (unchanged)
const roleConfig = {
  ADMIN: {
    login: "/admin/login",
    dashboard: "/admin/dashboard",
    checkBlocked: false,
    checkVerified: false,
  },
  COMPANY: {
    login: "/login/company",
    dashboard: "/home/company",
    checkBlocked: true,
    checkVerified: true,
  },
  CANDIDATE: {
    login: "/login/candidate",
    dashboard: "/home/candidate",
    checkBlocked: true,
    checkVerified: true,
  },
};

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const isApiRoute = pathname.startsWith("/api");
  const isNextAuthApi = pathname.startsWith("/api/auth");

  const isAuthPage =
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/login/company") ||
    pathname.startsWith("/login/candidate");

  // ✅ Allow NextAuth routes
  if (isNextAuthApi) return NextResponse.next();

  // =========================================================
  // 🔥 AUTHENTICATED USER CHECK (USING TOKEN ONLY)
  // =========================================================
  if (token?.email && token?.role) {
    const config = roleConfig[token.role as keyof typeof roleConfig];
    if (!config) return NextResponse.next();

    const redirectPath = config.login;

    // 🚫 BLOCKED (FROM TOKEN)
    if (config.checkBlocked && (token as any)?.isBlocked) {
      if (isApiRoute) {
        return clearAuthCookies(
          NextResponse.json({ error: "Account blocked" }, { status: 403 })
        );
      }

      if (isAuthPage) return NextResponse.next();

      return clearAuthCookies(
        NextResponse.redirect(
          new URL(`${redirectPath}?error=blocked`, req.url)
        )
      );
    }

    // 🚫 NOT VERIFIED (FROM TOKEN)
    if (config.checkVerified && !(token as any)?.isVerified) {
      if (isApiRoute) {
        return clearAuthCookies(
          NextResponse.json(
            { error: "Account not verified" },
            { status: 403 }
          )
        );
      }

      if (isAuthPage) return NextResponse.next();

      return clearAuthCookies(
        NextResponse.redirect(
          new URL(`${redirectPath}?error=not_verified`, req.url)
        )
      );
    }
  }

  // =========================================================
  // 🔁 LOGGED-IN USERS ACCESSING LOGIN PAGE
  // =========================================================
  if (token && isAuthPage) {
  const config = roleConfig[token.role as keyof typeof roleConfig];

  let destination = config?.dashboard || "/";

  // 🔥 HANDLE CANDIDATE STREAM
  if (token.role === "CANDIDATE") {
    if ((token as any).stream) {
      destination = "/home/enrolled";
    } else {
      destination = "/home/candidate";
    }
  }

  return NextResponse.redirect(new URL(destination, req.url));
}

  // =========================================================
  // 🌐 PUBLIC ROUTES
  // =========================================================
  if (isAuthPage) return NextResponse.next();

  // =========================================================
  // ❌ NOT LOGGED IN
  // =========================================================
  if (!token) {
    if (isApiRoute) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (pathname.startsWith("/home/company")) {
      return NextResponse.redirect(new URL("/login/company", req.url));
    }

    return NextResponse.redirect(
      new URL("/login/candidate", req.url)
    );
  }

  // =========================================================
  // 🔐 ROLE-BASED ACCESS CONTROL
  // =========================================================
  const role = token.role as string;

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return isApiRoute
      ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
      : NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (
    pathname.startsWith("/home/company") &&
    role !== "COMPANY"
  ) {
    return isApiRoute
      ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
      : NextResponse.redirect(new URL("/login/company", req.url));
  }

  const isCandidatePath =
    pathname.startsWith("/home/candidate") ||
    pathname.startsWith("/home/enrolled") ||
    pathname.startsWith("/profile/candidate");

  if (isCandidatePath && role !== "CANDIDATE") {
    return isApiRoute
      ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
      : NextResponse.redirect(
          new URL("/login/candidate", req.url)
        );
  }

  return NextResponse.next();
}

// =========================================================
// 📡 ROUTE MATCHER (UNCHANGED)
// =========================================================
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/home/:path*",
    "/profile/:path*",
    "/login/:path*",
  ],
};
