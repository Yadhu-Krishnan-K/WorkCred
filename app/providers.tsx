"use client";

import { SessionProvider } from "next-auth/react";
import { ErrorProvider } from "./ErrorContext";
import ErrorPopup from "@/components/ErrorPopup";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ErrorProvider>
        <ErrorPopup />
        {children}
      </ErrorProvider>
    </SessionProvider>
  )
}
