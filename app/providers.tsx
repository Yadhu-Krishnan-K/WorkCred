"use client";

import { SessionProvider } from "next-auth/react";
import { WebRTCProvider } from "@/Context/WebRTCContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WebRTCProvider>
        {children}
      </WebRTCProvider>
    </SessionProvider>
  )
}
