// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// import { connectDB } from "@/lib/db";
// import companymodel from "@/model/companymodel";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         // 1️⃣ Basic check
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }

//         // 2️⃣ Connect DB
//         await connectDB();

//         // 3️⃣ Find company by email
//         const company = await companymodel.findOne({
//           email: credentials.email,
//         });

//         console.log("company found",company)

//         if (!company) {
//           throw new Error("Company not found");
//         }

//         // 4️⃣ Compare password
//         const isPasswordCorrect = await bcrypt.compare(
//           credentials.password,
//           company.password
//         );

//         if (!isPasswordCorrect) {
//           throw new Error("Invalid password");
//         }

//         // 5️⃣ Return user object (VERY IMPORTANT)
//         return {
//           id: company._id.toString(),
//           name: company.companyName,
//           email: company.email,
//           role: "COMPANY",
//         };
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/login",
//   },

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = (user as any).id;
//         token.role = (user as any).role;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         (session.user as any).id = token.id;
//         (session.user as any).role = token.role;
//       }
//       return session;
//     },
//   },
// };
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import companymodel from "@/model/companymodel";
import candidatemodel from "@/model/candidatemodel";

export const authOptions: NextAuthOptions = {
  providers: [
    // ================= COMPANY LOGIN =================
    CredentialsProvider({
      id: "company-credentials",
      name: "Company Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectDB();

        const company = await companymodel.findOne({
          email: credentials.email,
        });

        if (!company) {
          throw new Error("Company not found");
        }

        const ok = await bcrypt.compare(
          credentials.password,
          company.password
        );

        if (!ok) {
          throw new Error("Invalid password");
        }

        return {
          id: company._id.toString(),
          name: company.companyName,
          email: company.email,
          role: "COMPANY",
        };
      },
    }),

    // ================= CANDIDATE LOGIN =================
    CredentialsProvider({
      id: "candidate-credentials",
      name: "Candidate Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectDB();

        const candidate = await candidatemodel.findOne({
          email: credentials.email,
        });

        if (!candidate) {
          throw new Error("Candidate not found");
        }

        const ok = await bcrypt.compare(
          credentials.password,
          candidate.password
        );

        if (!ok) {
          throw new Error("Invalid password");
        }

        return {
          id: candidate._id.toString(),
          name: candidate.fullName,
          email: candidate.email,
          role: "CANDIDATE",
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
