"use client";

import { motion } from "framer-motion";

interface EnrolledPathProps {
  stream: string | undefined;
  createdAt: string;
  isVerified: boolean;
}

export const EnrolledPath = ({ stream, createdAt, isVerified }: EnrolledPathProps) => {
  const dateConversion = (ymd: string) => {
    const date = new Date(ymd.split("T")[0]);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
        <span className="w-2 h-6 bg-emerald-500 rounded-full" />
        Your Chosen Field
      </h3>
      <motion.div
        whileHover={{ y: -5 }}
        className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Enrolled Path</span>
            <h4 className="text-4xl font-black italic mt-1">{stream || "Enroll in one"}</h4>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <p className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Status</p>
            <p className="text-lg font-bold">
              {isVerified?"Verified professional":"Your not verified yet"}
              </p>
            <p className="text-xs text-slate-400 mt-2">Member since {createdAt ? dateConversion(createdAt) : "___"}</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
      </motion.div>
    </div>
  );
};