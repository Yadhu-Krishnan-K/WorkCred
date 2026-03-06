import { motion } from "framer-motion";
import { FaFingerprint, FaShieldAlt } from "react-icons/fa";

interface EnrolledPathProps {
  stream: string | undefined;
  createdAt: string;
}

export const EnrolledPath = ({ stream, createdAt }: EnrolledPathProps) => {
  const dateConversion = (ymd: string) => {
    if (!ymd) return "2025";
    const date = new Date(ymd.split("T")[0]);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    });
  };

  return (
    <div className="group">
      {/* Section Header with Terminal-style prompt */}
      <h3 className="flex items-center gap-3 mb-6 font-mono text-xs font-black uppercase tracking-[0.4em] text-cyan-500/70">
        <span className="animate-pulse">●</span> 
        Field_Sector_Identity
        <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent ml-4" />
      </h3>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden bg-slate-900/40 border-l-4 border-fuchsia-600 backdrop-blur-md p-8 shadow-[10px_10px_0px_0px_rgba(6,182,212,0.1)] transition-all hover:shadow-[15px_15px_0px_0px_rgba(217,70,239,0.1)]"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <FaFingerprint className="text-9xl" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-fuchsia-500 rotate-45" />
              <span className="text-fuchsia-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Active_Protocol
              </span>
            </div>
            
            <h4 className="text-5xl font-black italic tracking-tighter text-white drop-shadow-[3px_3px_0px_#06b6d4]">
              {stream?.toUpperCase() || "GENERAL_TRACK"}
            </h4>
            
            <p className="font-mono text-[10px] text-slate-500 mt-2 flex items-center gap-2">
              <span className="text-cyan-500">ID:</span> 
              {Math.random().toString(16).slice(2, 10).toUpperCase()} // 
              <span className="text-cyan-500">LOC:</span> VERT_SECTOR_7
            </p>
          </div>

          {/* Status Badge Box */}
          <div className="relative border border-cyan-500/30 bg-slate-950/80 p-6 min-w-[240px] clip-path-polygon">
            {/* Top Right Notch */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-500/20 border-l border-b border-cyan-500/30" />
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Access_Level</p>
                <div className="flex items-center gap-2 text-white font-bold">
                  <FaShieldAlt className="text-cyan-400 text-xs" />
                  <p className="text-sm tracking-tight uppercase">Verified_Professional</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 mt-3">
              <p className="text-[9px] text-slate-500 font-mono italic">
                ESTABLISHED_CONNECTION: {createdAt ? dateConversion(createdAt) : "2025"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Small Cyber-Tag at the bottom */}
      <div className="mt-2 flex justify-end">
        <span className="text-[8px] font-mono text-slate-600 bg-slate-900 px-2 py-0.5 border border-slate-800 uppercase tracking-widest">
          Data_Integrity_Locked
        </span>
      </div>
    </div>
  );
};