"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes, FaMapMarkerAlt, FaBriefcase, FaShieldAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function CompanyDetailsModal({ co, onClose }: { co: any; onClose: () => void }) {
  if (!co) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" 
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Decorative Top Bar / Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
        >
          <FaTimes size={18} />
        </button>

        {/* Header Section with Gradient Background */}
        <div className="relative h-32 bg-gradient-to-r from-indigo-600 to-violet-600">
          <div className="absolute -bottom-10 left-10 p-1 bg-white rounded-[2rem] shadow-xl">
            <div className="relative w-24 h-24 rounded-[1.8rem] overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100">
              {co.profileImageUrl ? (
                <Image 
                  src={co.profileImageUrl} 
                  alt={co.companyName} 
                  fill 
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl font-black text-indigo-200">{co.companyName[0]}</span>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-16 p-10">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                {co.companyName}
              </h2>
              {co.isVerified && (
                <FaShieldAlt className="text-blue-500 mt-1" title="Verified Company" />
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 text-slate-500 text-sm font-semibold">
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                <FaMapMarkerAlt className="text-indigo-500" /> {co.city || "Remote"}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                <FaBriefcase className="text-indigo-500" /> {co.companyType} Industry
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {/* About Section */}
            <div>
              <h4 className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.25em] mb-3">
                Company Profile
              </h4>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                {co.description || `Welcome to ${co.companyName}. We are a leading entity in the ${co.companyType} sector, committed to excellence and professional growth.`}
              </p>
            </div>

            {/* Visual Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-3xl bg-indigo-50/50 border border-indigo-100/50">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Type</p>
                <p className="text-lg font-bold text-indigo-900">{co.companyType}</p>
              </div>
              <div className="p-4 rounded-3xl bg-emerald-50/50 border border-emerald-100/50">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Status</p>
                <p className="text-lg font-bold text-emerald-900">{co.isVerified ? "Verified" : "Active"}</p>
              </div>
            </div>

            {/* Action Button */}
            {/* <div className="flex gap-3">
              <button className="flex-[2] py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">
                Visit Official Portal <FaExternalLinkAlt className="text-xs opacity-50" />
              </button>
            </div> */}
            
            <p className="text-center text-[11px] text-slate-400 font-medium italic">
              Member since {new Date(co.createdAt).getFullYear()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}