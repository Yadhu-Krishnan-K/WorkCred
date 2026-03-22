"use client";

import { useError } from "@/app/ErrorContext";
import { useEffect } from "react";

export default function ErrorPopup() {
  const { error, setError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!error) return null;

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {error.message}
    </div>
  );
}