"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  description?: string;
  avgRating: number;
  experience: string;
  skills: string[];
  qualification: string;
  profileImageUrl?: string;
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
  const [file, setFile] = useState<File | null>(null)
  const [candidate, setCandidate] = useState<CandidateProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    fullName: "",
    description: "",
    experience: "",
    skills: "", // Comma separated for input
    qualification: ""
  });

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await fetch('/api/profile/candidate/getDetails');
        if (!res.ok) throw new Error('Failed to fetch candidate');
        const data = await res.json();
        setCandidate(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        // Fallback for development if API isn't running
        // setCandidate({
        //   id: "1",
        //   fullName: "Alex Rivera",
        //   email: "alex@example.com",
        //   isVerified: true,
        //   createdAt: new Date().toISOString(),
        //   updatedAt: new Date().toISOString()
        // });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidate();
  }, []);
  useEffect(() => {
    if (candidate) {
      setEditData({
        fullName: candidate.fullName,
        description: candidate.description || "",
        experience: candidate.experience || "",
        skills: candidate.skills?.join(", ") || "",
        qualification: candidate.qualification || ""
      });
    }
  }, [candidate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }


  const handleUpdateProfile = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/profile/candidate/updateDetails', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    });

    if (!res.ok) throw new Error("Update failed");

    setCandidate(prev =>
      prev
        ? {
            ...prev,
            ...editData,
            skills: editData.skills
              .split(",")
              .map(s => s.trim())
              .filter(Boolean),
          }
        : null
    );
    setIsModalOpen(false);
  } catch (err) {
    alert("Error updating profile");
  }
};



  const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload/profile-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();

    // 🔥 Update profile image instantly
    setCandidate(prev =>
      prev ? { ...prev, profileImageUrl: data.url } : null
    );
  } catch (err) {
    alert("Image upload failed");
  }
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
          className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white shadow-2xl shadow-slate-200/60 flex flex-col lg:flex-row items-start gap-10 relative overflow-hidden"
        >
          {/* Profile Image & Rating Badge */}
          <div className="relative group mx-auto lg:mx-0">
            <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <div className="w-full h-full rounded-[2.3rem] bg-white overflow-hidden relative">
                {candidate?.profileImageUrl ? (
                  <Image src={candidate.profileImageUrl} alt="Profile" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-50">
                    <FaRegUserCircle className="w-20 h-20 text-slate-200" />
                  </div>
                )}
              </div>
            </div>

            {/* Average Rating Float */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-2">
              <FaStar className="text-amber-400 w-4 h-4" />
              <span className="font-black text-slate-800 text-sm">{candidate?.avgRating || "5.0"}</span>
            </div>

            <label htmlFor="profileImageUpload" className="absolute top-2 right-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg cursor-pointer hover:bg-emerald-500 hover:text-white transition-all">
              <FaLightbulb className="w-4 h-4" />
            </label>
            <input
              id="profileImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (!selectedFile) return;

                setFile(selectedFile);
                handleUpload(selectedFile);
            }}
            />

          </div>

          {/* Main Content */}
          <div className="grow space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                  {candidate?.fullName}
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-lg tracking-wider">
                    {candidate?.experience || "5+ Years"} Exp
                  </span>
                  <button onClick={() => setIsModalOpen(true)} className="text-slate-300 hover:text-emerald-500 transition-colors">
                    <FaLightbulb className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-slate-500 font-medium max-w-2xl leading-relaxed italic">
                "{candidate?.description || "Building the future of digital experiences with code and creativity."}"
              </p>
            </div>

            {/* Skills & Qualification Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Core Expertise</p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {(candidate?.skills || ["React", "Next.js", "AI"]).map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-slate-900 text-white text-[11px] font-bold rounded-xl shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Academic Credential</p>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                    <FaAward />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{candidate?.qualification || "MSc Computer Science"}</span>
                </div>
              </div>
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



    <AnimatePresence>
  {isModalOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. KEEP YOUR EXISTING BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsModalOpen(false)}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      {/* 2. REPLACE THE OLD MODAL CARD WITH THE NEW CODE BELOW */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl border border-white overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="p-10">
          <div className="mb-8">
            <div className="w-12 h-2 bg-emerald-500 rounded-full mb-4" />
            <h3 className="text-3xl font-black text-slate-800">Refine Persona</h3>
            <p className="text-sm text-slate-500 font-medium">Your credentials define your visibility on WorkCred.</p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Display Name</label>
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all outline-none text-sm font-bold"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Experience Level</label>
                <input
                  type="text"
                  placeholder="e.g. 5+ Years"
                  value={editData.experience}
                  onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all outline-none text-sm font-bold"
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Qualification</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech in IT"
                  value={editData.qualification}
                  onChange={(e) => setEditData({ ...editData, qualification: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all outline-none text-sm font-bold"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all outline-none text-sm font-medium leading-relaxed"
                />
              </div>

              {/* Skills */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Skills (Comma separated)</label>
                <input
                  type="text"
                  value={editData.skills}
                  onChange={(e) => setEditData({ ...editData, skills: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all outline-none text-sm font-bold"
                  placeholder="React, Tailwind, Node.js"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-5 rounded-2xl bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-5 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-600 shadow-xl transition-all active:scale-95"
              >
                Update Portfolio
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </div>
  );
}


