     "use client";

import React from "react";
import Image from "next/image";
import { 
  FaBuilding, 
  FaTimes, 
  FaGlobe, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaCalendarAlt,
  FaExternalLinkAlt
} from "react-icons/fa";

interface CompanyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: any;
}

export const ProfileCompanyDetailModal = ({ isOpen, onClose, company }: CompanyDetailsModalProps) => {
  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with heavy blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-emerald-500 to-teal-600" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="relative pt-16 px-8 pb-10">
          {/* Logo Spotlight */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-xl border-4 border-white overflow-hidden">
               {company.profileImageUrl ? (
                    <Image src={company.profileImageUrl} alt="Logo" fill className="object-cover rounded-[2rem]" />
                  ) : (
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <FaBuilding className="text-4xl" />
                    </div>
                  )}
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              {company.companyName}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {company.companyType || "Enterprise"}
              </span>
              <span className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <FaMapMarkerAlt /> {company.city || "Remote / Global"}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
              <h5 className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-3 tracking-widest">
                <FaBriefcase className="text-emerald-500" /> Industry Role
              </h5>
              <p className="text-slate-700 font-semibold">{company.industry || "Technology & Innovation"}</p>
            </div>
            
            <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
              <h5 className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-3 tracking-widest">
                <FaCalendarAlt className="text-blue-500" /> Joined Network
              </h5>
              <p className="text-slate-700 font-semibold">{company.createdAt}</p>
            </div>
          </div>

          {/* About/Bio Section */}
          <div className="space-y-4 px-2">
            <h4 className="text-sm font-bold text-slate-800">About the Company</h4>
            <p className="text-slate-600 leading-relaxed text-sm">
              {company.description || "This company is a verified partner of WorkCred, committed to fostering talent and driving professional excellence through strategic collaboration."}
            </p>
          </div>

          {/* Action Footer */}
          {/* <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              <FaGlobe /> Visit Website
            </button>
            <button className="px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all flex items-center gap-2">
              View All Openings <FaExternalLinkAlt className="text-[10px]" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};