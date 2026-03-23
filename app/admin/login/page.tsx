"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Use NextAuth!
import { Lock, ShieldCheck, ArrowRight, User, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [adminLoginData, setAdminLoginData] = useState({ email: "", password: "" });

  // Mouse tracking for subtle "tilt" effect on the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // Logic: Using NextAuth instead of a raw fetch to /api/admin/login
      const result = await signIn("admin-credentials", {
        email: adminLoginData.email,
        password: adminLoginData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage(result.error);
        setLoading(false);
      } else {
        router.push("/admin/dashboard"); // Success redirect
      }
    } catch (error) {
      setErrorMessage("System breach detected. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden text-white selection:bg-amber-500/40">
      
      {/* --- Dynamic Background Layer --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 50, 0], 
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1], 
            x: [0, -50, 0], 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[120px]" 
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-10 pointer-events-none" />
      </div>

      {/* --- Main Content Layer --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg p-6"
      >
        {/* Floating Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            className="inline-block relative"
          >
            <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-20 animate-pulse" />
            <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-4">
              <ShieldCheck className="w-10 h-10 text-amber-500" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Command <span className="text-amber-500 not-italic">Center</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
            <Sparkles size={14} className="text-amber-600" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Secure Interface v2.0</span>
          </div>
        </div>

        {/* --- Tilt-Enabled Glass Card --- */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative group"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

          <form onSubmit={handleLogin} className="space-y-8 relative z-10">
            {/* Error Message */}
            {errorMessage && (
              <motion.div 
                layoutId="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4" />
                </div>
                {errorMessage}
              </motion.div>
            )}

            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.2em] ml-1">Auth ID</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within:text-amber-500" />
                  <input
                    type="email"
                    placeholder="admin@workcred.com"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-gray-700 outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all text-sm font-medium"
                    onChange={(e) => setAdminLoginData({ ...adminLoginData, email: e.target.value })}
                    value={adminLoginData.email}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.2em] ml-1">Security Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within:text-amber-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-gray-700 outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all text-sm font-medium"
                    onChange={(e) => setAdminLoginData({ ...adminLoginData, password: e.target.value })}
                    value={adminLoginData.password}
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full group relative py-5 rounded-2xl font-black text-sm uppercase tracking-widest overflow-hidden transition-all shadow-2xl shadow-amber-600/20 hover:shadow-amber-600/40"
            >
              {/* Button Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-[length:200%_100%] group-hover:bg-[100%_0%] transition-all duration-700" />
              
              <span className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Grant Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Nav */}
        <div className="flex justify-between items-center px-4 mt-8">
           <button onClick={() => router.push("/")} className="text-gray-600 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors">
            ← Main Site
           </button>
           <span className="text-[10px] text-gray-800 font-mono italic">Encrypted Connection</span>
        </div>
      </motion.div>
    </div>
  );
}