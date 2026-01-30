"use client";
import { motion } from "framer-motion";
import { FaTimes, FaBuilding, FaGlobe, FaUsers, FaExternalLinkAlt } from "react-icons/fa";

export default function CompanyDetailsModal({ co, onClose }: { co: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
      <motion.div 
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
        
        <div className="relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl font-black text-slate-300 mb-6">
                {co.name[0]}
            </div>
            
            <h2 className="text-4xl font-black text-slate-900 mb-2">{co.name}</h2>
            <div className="flex gap-4 text-slate-400 text-sm mb-8">
                <span className="flex items-center gap-1"><FaGlobe /> Website</span>
                <span className="flex items-center gap-1"><FaUsers /> 10k+ Employees</span>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-black uppercase text-amber-600 tracking-[0.2em] mb-2">About the Company</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        A global leader in innovation, {co.name} is known for fostering a culture of excellence and 
                        cutting-edge technological advancement.
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
                    <p className="text-xs font-bold text-amber-700">Recent Activity</p>
                    <p className="text-sm text-amber-900 mt-1 font-medium">Hiring for 12 roles in your specialization.</p>
                </div>

                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl">
                    CRED CONNECT <FaExternalLinkAlt className="text-xs" />
                </button>
            </div>
        </div>
      </motion.div>
    </div>
  );
}