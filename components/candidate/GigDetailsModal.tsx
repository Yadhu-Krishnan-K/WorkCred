"use client";
import { motion } from "framer-motion";
import { FaTimes, FaLaptopCode, FaWallet, FaHourglassHalf } from "react-icons/fa";

export default function GigDetailsModal({ gig, onClose }: { gig: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-emerald-950/60 backdrop-blur-md" />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-xl bg-emerald-900 text-white rounded-[2rem] p-8 shadow-2xl border border-emerald-700/50"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-emerald-300 hover:text-white"><FaTimes /></button>
        
        <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-800 flex items-center justify-center text-2xl text-emerald-400"><FaLaptopCode /></div>
            <h2 className="text-3xl font-black italic tracking-tight">{gig.title}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-emerald-800/50 p-4 rounded-2xl border border-emerald-700">
                <p className="text-[10px] uppercase font-bold text-emerald-400">Fixed Budget</p>
                <p className="text-xl font-black">{gig.budget}</p>
            </div>
            <div className="bg-emerald-800/50 p-4 rounded-2xl border border-emerald-700">
                <p className="text-[10px] uppercase font-bold text-emerald-400">Timeline</p>
                <p className="text-xl font-black">{gig.duration}</p>
            </div>
        </div>

        <div className="space-y-4 mb-8 text-emerald-100/80 text-sm leading-relaxed">
            <p>• High-priority project requiring expertise in modern frameworks.</p>
            <p>• Milestone-based payments via WorkCred Escrow.</p>
        </div>

        <button className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black rounded-2xl transition-all uppercase tracking-widest shadow-lg shadow-emerald-500/20">
            Submit Proposal
        </button>
      </motion.div>
    </div>
  );
}