"use client";

import { createContext, useContext, useState } from "react";

type ErrorType = {
  message: string;
};

type ErrorContextType = {
  error: ErrorType | null;
  setError: (err: ErrorType | null) => void;
};

const ErrorContext = createContext<ErrorContextType | null>(null);

export const useError = () => {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useError must be used within ErrorProvider");
  return ctx;
};

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<ErrorType | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};