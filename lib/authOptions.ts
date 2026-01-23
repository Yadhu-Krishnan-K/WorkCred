import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { connectDB } from '@/lib/db';
import candidatemodel from '@/model/candidatemodel';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await connectDB();
        const userDoc = await candidatemodel.findOne({ email: credentials.email });
        if (!userDoc) throw new Error('User not found');

        const ok = await bcrypt.compare(credentials.password, userDoc.password);
        if (!ok) throw new Error('Invalid credentials');

        return {
          id: userDoc._id.toString(),
          name: userDoc.name,
          email: userDoc.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET ?? 'rah123rahul=',
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as { id: string }).id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },
};
