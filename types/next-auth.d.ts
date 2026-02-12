// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      stream?: string | null;
      image?: string | null;
      role: string;
      id: string; // ✅ Custom ID added via callback
    };
  }

  interface user {
    id: string; // Optional: for JWT callback typing
    role: string;
    stream?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    stream?: string | null;
  }
}