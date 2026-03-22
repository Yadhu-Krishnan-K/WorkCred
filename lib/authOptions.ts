
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
          isVerified: company.isVerified,
          isBlocked: company.isBlocked,
        };
      },
    }),

    // ================= CANDIDATE LOGIN ===============
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
          stream: candidate.stream || null,
          isVerified: candidate.isVerified,
          isBlocked: candidate.isBlocked,
        };
      },
    }),

    // ================= ADMIN LOIGN ===================
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Hardcoded check (for initial setup/single admin)
        const isAdminEmail = credentials.email === process.env.ADMIN_EMAIL;
        const isAdminPass = credentials.password === process.env.ADMIN_PASSWORD;

        if (!isAdminEmail || !isAdminPass) {
          throw new Error("Invalid email or password");
        }

        if (isAdminEmail && isAdminPass) {
          return {
            id: "admin_id_001",
            name: "System Admin",
            email: credentials.email,
            role: "ADMIN",
            isVerified: true,
            isBlocked: false,
          };
        }

        throw new Error("Invalid admin credentials");
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
        token.stream = (user as any)?.stream || null;

        // ✅ NEW
        token.isVerified = (user as any).isVerified;
        token.isBlocked = (user as any).isBlocked;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).stream = token.stream;
      }
      return session;
    },
  },
};
