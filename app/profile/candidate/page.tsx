"use client";

import React, { useState, useEffect } from "react";
import { FaRegUserCircle, FaTerminal, FaNetworkWired } from "react-icons/fa";

import { ProfileHeader } from "@/components/candidate/profile/ProfileHeader";
import { AcceptedRequests } from "@/components/candidate/profile/AcceptedRequests";
import { EnrolledPath } from "@/components/candidate/profile/EnrolledPath";
import { FeedbackSection } from "@/components/candidate/profile/FeedbackSection";
import { EditProfileModal } from "@/components/candidate/profile/EditProfileModal";
import { PdfModal } from "@/components/candidate/profile/PdfModal";

// Types
export interface CandidateProfileResponse {
  id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  stream?: string;
  description?: string;
  avgRating: number;
  experience: string;
  skills: string[];
  qualification: string;
  pdfUrl?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

//mock ratings data
const pastRatings = [
  { company: "Global Finance", rating: 5, comment: "Excellent interview process and transparent communication.", date: "2 days ago" },
  { company: "BioHealth Lab", rating: 4, comment: "Great mentorship, but the onboarding was a bit slow.", date: "1 month ago" },
];

export default function CandidateProfile() {
  const [file, setFile] = useState<File | null>(null)
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [pdf, setPdf] = useState<File | null>(null)
  const [acceptedCompanies, setAcceptedCompanies] = useState<any[]>([])
  const [isParsing, setIsParsing] = useState(false);
  const [candidate, setCandidate] = useState<CandidateProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isuploading, setIsUploading] = useState(false)
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
    const fetchCandidateAndCompanies = async () => {
      try {
        const [res, companiesRes] = await Promise.all([fetch('/api/profile/candidate/getDetails'), fetch("/api/enrolled/accepted")])
        const companiesData = await companiesRes.json();
        console.log('companies Data = ', companiesData)
        setAcceptedCompanies(companiesData.companies)
        if (!res.ok) throw new Error('Failed to fetch candidate');
        const data = await res.json();
        console.log("candidate data = ", data)
        setCandidate(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");

      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidateAndCompanies();
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-b-2 border-t-2 border-cyan-500"></div>
          <div className="absolute inset-2 animate-reverse-spin rounded-full border-l-2 border-r-2 border-fuchsia-500"></div>
        </div>
        <p className="mt-4 font-mono text-xs tracking-[0.3em] text-cyan-500 animate-pulse">SYNCING_DATA...</p>
      </div>
    );
  }

  // Logic to handle PDF upload and parsing
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const resumeFile = e.target.files?.[0];
    if (!resumeFile) return;
    setPdf(resumeFile)
    setIsParsing(true);
    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const response = await fetch("/api/analyze_resume", { // Change to your actual route
        method: "POST",
        body: formData,
      });

      const parsed = await response.json();

      // Update state with parsed data (mapping your API keys to your state keys)
      setEditData(prev => ({
        ...prev,
        fullName: parsed.name || prev.fullName,
        experience: parsed.yearsOfExperience || prev.experience,
        qualification: parsed.education || prev.qualification,
        description: parsed.summary || prev.description,
        skills: Array.isArray(parsed.skills) ? parsed.skills.join(", ") : parsed.skills || prev.skills,
      }));
    } catch (err) {
      console.error("Resume parsing failed:", err);
    } finally {
      setIsParsing(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData()

    console.log('edit data ====', editData)
    try {
      if (pdf) {
        formData.append("resumeFile", pdf)
      }
      formData.append("profileData", JSON.stringify(editData))
      const res = await fetch('/api/profile/candidate/updateDetails', {
        method: 'PATCH',
        body: formData,
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

  const handleUpload = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      setIsUploading(true)
      const res = await fetch("/api/upload/profile-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      console.log('data = ', data)
      // 🔥 Update profile image instantly
      setCandidate(prev =>
        prev ? { ...prev, profileImageUrl: data.imageUrl } : null
      );
    } catch (err) {
      console.log('error = ', err)
      alert("Image upload failed");
    } finally {
      setIsUploading(false)
    }
  };

  // const handleViewResume = () => {
  //   if (candidate?.pdfUrl) {
  //     setIsResumePreviewOpen(true);
  //   }
  // };
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30">
      
      {/* 1. CYBERPUNK BACKGROUND GRID */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        {/* Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-900/10 blur-[120px]" />
      </div>

      {/* 2. NEON NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-cyan-500/20 flex items-center justify-between px-8 py-4 shadow-[0_4px_20px_-10px_rgba(6,182,212,0.3)]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-cyan-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8)]">
            <FaNetworkWired className="-rotate-45 text-slate-950 text-sm" />
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            WORK<span className="text-cyan-400">CRED</span>
            <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse bg-fuchsia-500"></span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-bold text-cyan-500 tracking-widest uppercase">Node_Active</p>
            <p className="text-[9px] text-slate-500 font-mono">127.0.0.1:8080</p>
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 transition-colors cursor-pointer group">
            <FaRegUserCircle className="w-6 h-6 text-slate-400 group-hover:text-cyan-400" />
          </div>
        </div>
      </nav>

      {/* 3. MAIN CONTENT */}
      <main className="relative z-10 grow container mx-auto px-6 py-12 space-y-12">

        {/* Profile Header */}
        <ProfileHeader
          candidate={candidate}
          handleUpload={handleUpload}
          isUploading={isuploading}
          onOpenEdit={() => setIsModalOpen(true)}
          setFile={setFile}
          onViewResume={() => setIsResumePreviewOpen(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <section className="lg:col-span-2 space-y-12">
            
            {/* Wrapper for Sections to give them a "Panel" feel */}
            <div className="relative group p-1">
               <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-3xl -z-10" />
               <EnrolledPath
                createdAt={candidate!.createdAt}
                stream={candidate!.stream}
              />
            </div>

            <div className="relative group p-1">
               <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500/10 to-transparent rounded-3xl -z-10" />
               <FeedbackSection
                ratings={pastRatings}
              />
            </div>
          </section>

          {/* Right Column: Companies */}
          <aside className="relative">
            <div className="sticky top-28">
               <AcceptedRequests
                companies={acceptedCompanies}
              />
            </div>
          </aside>
        </div>
      </main>

      {/* 4. TECH FOOTER */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono tracking-widest text-slate-500">
            &copy; 2026 // WORKCRED_INTERFACE // ALL_RIGHTS_RESERVED
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] font-black text-cyan-500/50 uppercase">Security_Encrypted</span>
            <span className="text-[10px] font-black text-fuchsia-500/50 uppercase">Neural_Link_Stable</span>
          </div>
        </div>
      </footer>

      {/* Modals remain functionally the same */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editData}
        setEditData={setEditData}
        onSubmit={handleUpdateProfile}
        isParsing={isParsing}
        onResumeUpload={handleResumeUpload}
      />

      <PdfModal
        isOpen={isResumePreviewOpen} 
        onClose={() => setIsResumePreviewOpen(false)} 
        pdfUrl={candidate?.pdfUrl}
      />

      <style jsx global>{`
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
