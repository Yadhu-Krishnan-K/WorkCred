"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaRegUserCircle, 
  FaStar, 
  FaBuilding, 
  FaCheckCircle, 
  FaArrowRight, 
  FaAward,
  FaLightbulb
} from "react-icons/fa";

// Types
export interface CandidateProfileResponse {
  id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  createdAt: string; 
  updatedAt: string;
}

// Mock Data
const activeField = { 
  title: "IT", 
  focus: "Software, Cloud & AI solutions", 
  status: "Active Professional",
  joinedDate: "October 2025"
};

const acceptedCompanies = [
  { name: "TechNova Corp", industry: "Cloud Solutions", date: "Jan 20, 2026" },
  { name: "GreenRoot Systems", industry: "AgriTech", date: "Jan 15, 2026" },
];

const pastRatings = [
  { company: "Global Finance", rating: 5, comment: "Excellent interview process and transparent communication.", date: "2 days ago" },
  { company: "BioHealth Lab", rating: 4, comment: "Great mentorship, but the onboarding was a bit slow.", date: "1 month ago" },
];

export default function CandidateProfile() {
  const [candidate, setCandidate] = useState<CandidateProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await fetch('/api/profile/candidate');
        if (!res.ok) throw new Error('Failed to fetch candidate');
        const data = await res.json();
        setCandidate(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        // Fallback for development if API isn't running
        setCandidate({
          id: "1",
          fullName: "Alex Rivera",
          email: "alex@example.com",
          isVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidate();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const [file, setFile] = useState<File | null>(null)
  
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload/profile-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-emerald-100/40 blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-amber-100/40 blur-[100px]" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-black bg-linear-to-r from-amber-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
          WorkCred
        </h1>
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
          <FaRegUserCircle className="w-6 h-6 text-emerald-600" />
        </div>
      </nav>

      <main className="relative grow container mx-auto px-6 py-12 space-y-10">
        
        {/* Profile Header Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg">
                <FaRegUserCircle className="w-20 h-20" />
            </div>
            <input type="file" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <button onClick={handleUpload}>Upload</button>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white p-2 rounded-xl shadow-lg">
                <FaAward />
            </div>
          </div>
          
          <div className="text-center md:text-left grow">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{candidate?.fullName}</h2>
            <p className="text-emerald-600 font-semibold uppercase tracking-widest text-xs mt-1">Certified Specialist</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600 border border-slate-200">BENGALURU, IN</span>
                <span className="px-4 py-1.5 bg-amber-50 rounded-full text-xs font-bold text-amber-700 border border-amber-200">
                    {candidate?.isVerified ? "Verified ID" : "Pending Verification"}
                </span>
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: Field & Ratings */}
          <section className="lg:col-span-2 space-y-10">
            
            {/* The Enrolled Field Section */}
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
                    <h4 className="text-4xl font-black italic mt-1">{activeField.title}</h4>
                    <p className="text-slate-400 mt-2 max-w-xs">{activeField.focus}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
                    <p className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Status</p>
                    <p className="text-lg font-bold">{activeField.status}</p>
                    <p className="text-xs text-slate-400 mt-2">Member since {activeField.joinedDate}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              </motion.div>
            </div>

            {/* Ratings Section */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                  <span className="w-2 h-6 bg-amber-500 rounded-full" />
                  Past Feedback Given
              </h3>
              <div className="grid gap-4">
                {pastRatings.map((rate, i) => (
                  <div key={i} className="group bg-white border border-slate-100 p-6 rounded-3xl hover:border-amber-200 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                          <FaLightbulb />
                        </div>
                        <span className="font-bold text-slate-700">{rate.company}</span>
                      </div>
                      <div className="flex text-amber-400 gap-1">
                          {[...Array(5)].map((_, idx) => (
                            <FaStar key={idx} className={idx < rate.rating ? "fill-current" : "text-slate-100"} />
                          ))}
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed italic">"{rate.comment}"</p>
                    <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-tighter">{rate.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right Column: Companies */}
          <aside>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                <span className="w-2 h-6 bg-blue-500 rounded-full" />
                Requests Accepted
            </h3>
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
                <div className="space-y-6">
                    {acceptedCompanies.map((company, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all border border-slate-100">
                                <FaBuilding />
                            </div>
                            <div className="grow">
                                <h4 className="text-sm font-bold text-slate-800">{company.name}</h4>
                                <p className="text-[10px] text-slate-500 font-medium uppercase">{company.industry}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <FaCheckCircle className="text-emerald-500" />
                              <span className="text-[8px] text-slate-300 mt-1 font-bold">JAN 2026</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full py-4 rounded-2xl bg-emerald-600 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2">
                    Open Dashboard <FaArrowRight />
                </button>
            </div>
          </aside>

        </div>
      </main>

      <footer className="py-10 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">© 2026 <span className="font-bold text-slate-700 uppercase">WorkCred</span> — Professional Portfolio</p>
      </footer>
    </div>
  );
}