import type { NextAuthOptions } from "next-auth";
import { signIn, signOut } from 'next-auth/react';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import companymodel from "@/model/companymodel";
import candidatemodel from "@/model/candidatemodel";

// FOR GOOGLE AUTH
export const handleSignIn = () => signIn('google');
export const handleSignOut = () => signOut();

export const authOptions: NextAuthOptions = {
  providers: [
    //================== GOOGLE AUTH ===================
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ================= COMPANY LOGIN =================
    CredentialsProvider({
      id: "company-credentials",
      name: "Company Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("🔥 [COMPANY LOGIN] authorize called");

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          throw new Error("Email and password are required");
        }

        await connectDB();
        console.log("✅ DB connected");

        const company = await companymodel.findOne({
          email: credentials.email,
        });

        console.log("👀 Company found:", company?.email);

        if (!company) {
          console.log("❌ Company not found");
          throw new Error("Company not found");
        }

        const ok = await bcrypt.compare(
          credentials.password,
          company.password
        );

        console.log("🔑 Password match:", ok);

        if (!ok) {
          console.log("❌ Invalid password");
          throw new Error("Invalid password");
        }

        const userObj = {
          id: company._id.toString(),
          name: company.companyName,
          email: company.email,
          role: "COMPANY",
          isVerified: company.isVerified,
          isBlocked: company.isBlocked,
        };

        console.log("✅ COMPANY LOGIN SUCCESS:", userObj);

        return userObj;
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
        console.log("🔥 [CANDIDATE LOGIN] authorize called");

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          throw new Error("Email and password are required");
        }

        console.log('db connecting.....');
        await connectDB();

        const candidate = await candidatemodel.findOne({
          email: credentials.email,
        });

        console.log('👀 candidate ===', candidate);

        if (!candidate) {
          console.log("❌ Candidate not found");
          throw new Error("Candidate not found");
        }

        if (!candidate.password) {
          console.log("❌ No password (Google user)");
          throw new Error("Please login using Google");
        }

        const ok = await bcrypt.compare(
          credentials.password,
          candidate.password
        );

        console.log('🔑 password match = ', ok);

        if (!ok) {
          console.log("❌ Invalid password");
          throw new Error("Invalid password");
        }

        const userObj = {
          id: candidate._id.toString(),
          name: candidate.fullName,
          email: candidate.email,
          role: "CANDIDATE",
          stream: candidate.stream || null,
          isVerified: candidate.isVerified,
          isBlocked: candidate.isBlocked,
        };

        console.log("✅ CANDIDATE LOGIN SUCCESS:", userObj);

        return userObj;
      },
    }),

    // ================= ADMIN LOGIN ===================
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔥 [ADMIN LOGIN] authorize called");

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          throw new Error("Email and password are required");
        }

        const isAdminEmail = credentials.email === process.env.ADMIN_EMAIL;
        const isAdminPass = credentials.password === process.env.ADMIN_PASSWORD;

        console.log("👀 Admin email match:", isAdminEmail);
        console.log("👀 Admin password match:", isAdminPass);

        if (!isAdminEmail || !isAdminPass) {
          console.log("❌ Invalid admin credentials");
          throw new Error("Invalid email or password");
        }

        const adminObj = {
          id: "admin_id_001",
          name: "System Admin",
          email: credentials.email,
          role: "ADMIN",
          isVerified: true,
          isBlocked: false,
        };

        console.log("✅ ADMIN LOGIN SUCCESS:", adminObj);

        return adminObj;
      },
    }),
  ],

  pages: {
    signIn: "/login/candidate",
    error: "/login/candidate",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {

    async signIn({ user, account }) {
      console.log("🔥 signIn callback triggered");
      console.log("👤 User:", user);
      console.log("📦 Account:", account?.provider);

      if (account?.provider === "google") {
        await connectDB();

        const existing = await candidatemodel.findOne({
          email: user.email,
        });

        console.log('👀 Google user exists:', existing);

        if (!existing) {
          console.log('🆕 Creating new Google user');

          const newUser = await candidatemodel.create({
            email: user.email,
            fullName: user.name,
            isVerified: true,
            isBlocked: false,
            password: "",
          });

          (user as any).role = "CANDIDATE";
          (user as any).id = newUser._id.toString();

        } else {
          console.log('✅ Existing Google user');

          (user as any).role = "CANDIDATE";
          (user as any).id = existing._id.toString();
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      console.log("🔥 JWT CALLBACK");
      console.log("➡️ Incoming token:", token);
      console.log("➡️ Incoming user:", user);

      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.stream = (user as any)?.stream || null;
        token.isVerified = (user as any).isVerified;
        token.isBlocked = (user as any).isBlocked;
      }

      console.log("✅ JWT TOKEN AFTER:", token);

      return token;
    },

    async session({ session, token }) {
      console.log("🔥 SESSION CALLBACK");
      console.log("➡️ Token received:", token);

      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).stream = token.stream;

        // ✅ IMPORTANT FIX
        (session.user as any).isVerified = token.isVerified;
        (session.user as any).isBlocked = token.isBlocked;
      }

      console.log("✅ FINAL SESSION:", session);

      return session;
    },
  },
};