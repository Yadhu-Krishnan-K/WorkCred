"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaRegUserCircle,
  FaStar,
  FaCamera,
  FaAward,
  FaPen,
  FaFilePdf,
  FaTerminal
} from "react-icons/fa";

interface Props {
  candidate: any;
  isUploading: boolean;
  handleUpload: (file: File) => void;
  setFile: any;
  onOpenEdit: () => void;
  onViewResume: () => void;
}

export const ProfileHeader = ({ candidate, isUploading, handleUpload, setFile, onOpenEdit, onViewResume }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative group overflow-hidden rounded-br-[4rem] rounded-tl-[4rem] border-2 border-cyan-500/30 bg-slate-950 p-8 shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] md:p-12"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-fuchsia-600/20 blur-[100px]" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-cyan-600/20 blur-[100px]" />
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50" />

      <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:items-start">

        {/* Cyber Profile Hexagon/Square Container */}
        <div className="relative group">
          <div className="relative h-44 w-44">
            {/* Animated Border Spin */}
            <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-3xl border-2 border-dashed border-cyan-400/50" />

            <div className="absolute inset-2 overflow-hidden rounded-2xl bg-slate-900 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              {isUploading ? (
                <div className="flex h-full w-full items-center justify-center bg-slate-900">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                </div>
              ) : candidate?.profileImageUrl ? (
                <>
                  <Image src={candidate.profileImageUrl} alt="Profile" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  {/* Scanning Line Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-1/2 w-full animate-[scan_3s_ease-in-out_infinite] pointer-events-none" />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-800">
                  <FaRegUserCircle className="h-24 w-24 text-slate-600" />
                </div>
              )}
            </div>
          </div>

          {/* Rating Badge - Neon Style */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-cyan-400 bg-slate-950 px-4 py-1 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
            <FaStar className="h-3 w-3 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
            <span className="text-xs font-black tracking-tighter text-cyan-50">
              {candidate?.avgRating || "5.0"}
            </span>
          </div>

          {/* Upload Button */}
          <label htmlFor="profileImageUpload" className="absolute -right-2 top-0 cursor-pointer rounded-lg border border-cyan-500/50 bg-slate-900 p-2 text-cyan-400 transition-all hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,1)]">
            <FaCamera className="h-4 w-4" />
            <input id="profileImageUpload" type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) { setFile(file); handleUpload(file); }
            }} />
          </label>
        </div>

        {/* Info Content */}
        <div className="flex-grow space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <h2 className="text-5xl font-black italic tracking-tighter text-white drop-shadow-[2px_2px_0px_#ff00ff]">
                {candidate?.fullName || "UNKNOWN_USER"}
              </h2>

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <span className="border border-fuchsia-500/50 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-fuchsia-400">
                  {candidate?.experience ? `SYS_EXP: ${candidate.experience}Y` : "EXP_NOT_FOUND"}
                </span>

                {candidate?.pdfUrl && (
                  <button onClick={onViewResume} className="flex items-center gap-2 border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500 hover:text-black">
                    <FaFilePdf /> VIEW_DATA_CORE
                  </button>
                )}

                <button onClick={onOpenEdit} className="text-slate-500 hover:text-fuchsia-500 transition-colors">
                  <FaPen className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative inline-block">
              <p className="max-w-2xl font-mono text-sm leading-relaxed text-slate-400">
                <span className="text-cyan-500 mr-2 opacity-50">&gt;</span>
                {candidate?.description || "Initializing neural interface... system ready."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-2 border-t border-slate-800">
            {/* Skills Section - Refined Tactical Layout */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-fuchsia-500" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-500">
                  Core_Modules
                </p>
                <div className="h-[1px] w-full bg-gradient-to-r from-fuchsia-500/30 to-transparent" />
              </div>

              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {(candidate?.skills || ["React", "Next.js", "AI"]).map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="group relative px-4 py-1.5"
                  >
                    {/* Subtle Corner Brackets */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500/50 group-hover:border-fuchsia-500" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500/50 group-hover:border-fuchsia-500" />

                    {/* Skill Text */}
                    <span className="text-[11px] font-mono font-bold tracking-tighter text-slate-300 group-hover:text-cyan-400 transition-colors">
                      <span className="text-cyan-600/50 mr-1">#</span>
                      {skill.toUpperCase()}
                    </span>

                    {/* Background Hover Glow */}
                    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Academic */}
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Credentials</p>
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-fuchsia-500/50 bg-fuchsia-500/5 shadow-[0_0_10px_rgba(217,70,239,0.3)]">
                  <FaAward className="h-6 w-6 text-fuchsia-500" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Verified_Level</p>
                  <p className="font-mono text-sm font-bold text-slate-200">{candidate?.qualification || "MSc Computer Science"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind Custom Keyframes for the scan effect (Add to global CSS or keep here if using a style tag) */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </motion.section>
  );
};