"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ArrowRight, User, AlertCircle } from "lucide-react";

interface AdminLoginData {
  email: string;
  password: string;
}

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Track errors
  const [adminLoginData, setAdminLoginData] = useState<AdminLoginData>({
    email: "",
    password: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      const res = await fetch("/api/admin/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(adminLoginData)
      });

      const data = await res.json(); // Fix 1: Must await the json parsing

      if (res.ok) {
        // Success: Redirect
        router.push("/admin/dashboard");
      } else {
        // Logic Error: Show the error message from the API
        setErrorMessage(data.error || "Authentication failed");
        setLoading(false);
      }
    } catch (error) {
      // Network/Server Error
      console.error('Login Error: ', error);
      setErrorMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] relative overflow-hidden text-white">
      {/* Mesmerizing Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8"
      >
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-4 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Admin <span className="text-amber-500">Portal</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Secure authorization required</p>
        </div>

        {/* Glassmorphic Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Error Message Display */}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {errorMessage}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Identity</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="email" // Changed to email for better validation
                  placeholder="Admin Email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                  onChange={(e) => setAdminLoginData({ ...adminLoginData, email: e.target.value })}
                  value={adminLoginData.email}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                  onChange={(e) => setAdminLoginData({ ...adminLoginData, password: e.target.value })}
                  value={adminLoginData.password}
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full relative overflow-hidden group bg-gradient-to-r from-amber-500 to-orange-600 py-4 rounded-xl font-bold text-white shadow-lg shadow-amber-600/20 transition-all hover:shadow-amber-600/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Initialize Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </div>

        <p className="text-center mt-8">
          <button 
            onClick={() => router.push("/")}
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            ← Return to public site
          </button>
        </p>
      </motion.div>
    </div>
  );
}