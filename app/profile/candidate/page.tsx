// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   FaRegUserCircle,
// } from "react-icons/fa";

// import { ProfileHeader } from "@/components/candidate/profile/ProfileHeader";
// import { AcceptedRequests } from "@/components/candidate/profile/AcceptedRequests";
// import { EnrolledPath } from "@/components/candidate/profile/EnrolledPath";
// import { FeedbackSection } from "@/components/candidate/profile/FeedbackSection";
// import { EditProfileModal } from "@/components/candidate/profile/EditProfileModal";
// import { PdfModal } from "@/components/candidate/profile/PdfModal";
// import { ProfileCompanyDetailModal } from "@/components/candidate/profile/ProfileCompanyDetailModal";


// export interface CandidateProfileResponse {
//   id: string;
//   fullName: string;
//   email: string;
//   isVerified: boolean;
//   stream?: string;
//   description?: string;
//   avgRating: number;
//   experience: string;
//   skills: string[];
//   qualification: string;
//   pdfUrl?: string;
//   profileImageUrl?: string;
//   createdAt: string;
//   updatedAt: string;
// }


// const pastRatings = [
//   { company: "Global Finance", rating: 5, comment: "Excellent interview process and transparent communication.", date: "2 days ago" },
//   { company: "BioHealth Lab", rating: 4, comment: "Great mentorship, but the onboarding was a bit slow.", date: "1 month ago" },
// ];

// export default function CandidateProfile() {
//   const [file, setFile] = useState<File | null>(null)
//   const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
//   const [pdf, setPdf] = useState<File | null>(null)
//   const [acceptedCompanies, setAcceptedCompanies] = useState<any[]>([])
//   const [isParsing, setIsParsing] = useState(false);
//   const [candidate, setCandidate] = useState<CandidateProfileResponse | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isuploading, setIsUploading] = useState(false)
//   const [error, setError] = useState<string | null>(null);
//   const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
//   const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editData, setEditData] = useState({
//     fullName: "",
//     description: "",
//     experience: "",
//     skills: "", // Comma separated for input
//     qualification: ""
//   });

//   useEffect(() => {
//     const fetchCandidateAndCompanies = async () => {
//       try {
//         const [res, companiesRes] = await Promise.all([fetch('/api/profile/candidate/getDetails'), fetch("/api/enrolled/accepted")])
//         const companiesData = await companiesRes.json();
//         console.log('companies Data = ', companiesData)
//         setAcceptedCompanies(companiesData.companies)
//         if (!res.ok) throw new Error('Failed to fetch candidate');
//         const data = await res.json();
//         console.log("candidate data = ", data)
//         setCandidate(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");

//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCandidateAndCompanies();
//   }, []);

//   useEffect(() => {
//     if (candidate) {
//       setEditData({
//         fullName: candidate.fullName,
//         description: candidate.description || "",
//         experience: candidate.experience || "",
//         skills: candidate.skills?.join(", ") || "",
//         qualification: candidate.qualification || ""
//       });
//     }
//   }, [candidate]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
//       </div>
//     );
//   }

//   const handleShowCompany = (company: any) => {
//     setSelectedCompany(company);
//     setIsCompanyModalOpen(true);
//   };


//   const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const resumeFile = e.target.files?.[0];
//     if (!resumeFile) return;
//     setPdf(resumeFile)
//     setIsParsing(true);
//     const formData = new FormData();
//     formData.append("resume", resumeFile);

//     try {
//       const response = await fetch("/api/analyze_resume", {
//         method: "POST",
//         body: formData,
//       });

//       const parsed = await response.json();

      
//       setEditData(prev => ({
//         ...prev,
//         fullName: parsed.name || prev.fullName,
//         experience: parsed.yearsOfExperience || prev.experience,
//         qualification: parsed.education || prev.qualification,
//         description: parsed.summary || prev.description,
//         skills: Array.isArray(parsed.skills) ? parsed.skills.join(", ") : parsed.skills || prev.skills,
//       }));
//     } catch (err) {
//       console.error("Resume parsing failed:", err);
//     } finally {
//       setIsParsing(false);
//     }
//   };

//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData()

//     console.log('edit data ====', editData)
//     try {
//       if (pdf) {
//         formData.append("resumeFile", pdf)
//       }
//       formData.append("profileData", JSON.stringify(editData))
//       const res = await fetch('/api/profile/candidate/updateDetails', {
//         method: 'PATCH',
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Update failed");

//       setCandidate(prev =>
//         prev
//           ? {
//             ...prev,
//             ...editData,
//             skills: editData.skills
//               .split(",")
//               .map(s => s.trim())
//               .filter(Boolean),
//           }
//           : null
//       );
//       setIsModalOpen(false);
//     } catch (err) {
//       alert("Error updating profile");
//     }
//   };

//   const handleUpload = async (imageFile: File) => {
//     const formData = new FormData();
//     formData.append("file", imageFile);

//     try {
//       setIsUploading(true)
//       const res = await fetch("/api/upload/profile-image", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Upload failed");

//       const data = await res.json();
//       console.log('data = ', data)
//       // 🔥 Update profile image instantly
//       setCandidate(prev =>
//         prev ? { ...prev, profileImageUrl: data.imageUrl } : null
//       );
//     } catch (err) {
//       console.log('error = ', err)
//       alert("Image upload failed");
//     } finally {
//       setIsUploading(false)
//     }
//   };

 
//   return (
//     <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900">

//       {/* Dynamic Background Elements */}
//       <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-emerald-100/40 blur-[100px]" />
//       <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-amber-100/40 blur-[100px]" />

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 flex items-center justify-between px-8 py-4">
//         <h1 className="text-2xl font-black bg-linear-to-r from-amber-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
//           WorkCred
//         </h1>
//         <div className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
//           <FaRegUserCircle className="w-6 h-6 text-emerald-600" />
//         </div>
//       </nav>

//       <main className="relative grow container mx-auto px-6 py-12 space-y-10">

//         {/* Profile Header Section */}
//         <ProfileHeader
//           candidate={candidate}
//           handleUpload={handleUpload}
//           isUploading={isuploading}
//           onOpenEdit={() => { setIsModalOpen(true) }}
//           setFile={setFile}
//           onViewResume={()=>{setIsResumePreviewOpen(true)}}
//         />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* Main Column: Field & Ratings */}
//           <section className="lg:col-span-2 space-y-10">

//             {/* The Enrolled Field Section */}
//             <EnrolledPath
//               createdAt={candidate!.createdAt}
//               stream={candidate!.stream}
//             />

//             {/* Ratings Section */}
//             <FeedbackSection
//               ratings={pastRatings}
//             />
//           </section>

//           {/* Right Column: Companies */}
//           <AcceptedRequests
//             companies={acceptedCompanies}
//             onSelectCompany={handleShowCompany}
//           />

//         </div>
//       </main>

//       <footer className="py-10 border-t border-gray-100 text-center">
//         <p className="text-xs text-gray-400">© 2026 <span className="font-bold text-slate-700 uppercase">WorkCred</span> — Professional Portfolio</p>
//       </footer>



//       <EditProfileModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         editData={editData}
//         setEditData={setEditData}
//         onSubmit={handleUpdateProfile}
//         isParsing={isParsing}
//         onResumeUpload={handleResumeUpload}
//       />

//       <PdfModal
//         isOpen={isResumePreviewOpen} 
//         onClose={() => setIsResumePreviewOpen(false)} 
//         pdfUrl={candidate?.pdfUrl}
//       />

//       <ProfileCompanyDetailModal
//         isOpen={isCompanyModalOpen}
//         onClose={() => setIsCompanyModalOpen(false)}
//         company={selectedCompany}
//       />
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import {
  FaRegUserCircle,
} from "react-icons/fa";

import { ProfileHeader } from "@/components/candidate/profile/ProfileHeader";
import { AcceptedRequests } from "@/components/candidate/profile/AcceptedRequests";
import { EnrolledPath } from "@/components/candidate/profile/EnrolledPath";
import { FeedbackSection } from "@/components/candidate/profile/FeedbackSection";
import { EditProfileModal } from "@/components/candidate/profile/EditProfileModal";
import { PdfModal } from "@/components/candidate/profile/PdfModal";
import { ProfileCompanyDetailModal } from "@/components/candidate/profile/ProfileCompanyDetailModal";


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

export default function CandidateProfile() {

  const [file, setFile] = useState<File | null>(null)
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [pdf, setPdf] = useState<File | null>(null)
  const [acceptedCompanies, setAcceptedCompanies] = useState<any[]>([])
  const [pastRatings, setPastRatings] = useState<any[]>([])   // ⭐ NEW STATE
  const [isParsing, setIsParsing] = useState(false);
  const [candidate, setCandidate] = useState<CandidateProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isuploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editData, setEditData] = useState({
    fullName: "",
    description: "",
    experience: "",
    skills: "",
    qualification: ""
  });

  useEffect(() => {

    const fetchCandidateAndCompanies = async () => {

      try {

        const [res, companiesRes, ratingsRes] = await Promise.all([
          fetch("/api/profile/candidate/getDetails"),
          fetch("/api/enrolled/accepted"),
          fetch("/api/rating/candidate")   // ⭐ fetch ratings
        ]);

        const companiesData = await companiesRes.json();
        setAcceptedCompanies(companiesData.companies)

        const ratingsData = await ratingsRes.json();
        setPastRatings(ratingsData.ratings || [])

        if (!res.ok) throw new Error("Failed to fetch candidate");

        const data = await res.json();
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  }

  const handleShowCompany = (company: any) => {

    setSelectedCompany(company);
    setIsCompanyModalOpen(true);

  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const resumeFile = e.target.files?.[0];
    if (!resumeFile) return;

    setPdf(resumeFile)
    setIsParsing(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {

      const response = await fetch("/api/analyze_resume", {
        method: "POST",
        body: formData,
      });

      const parsed = await response.json();

      setEditData(prev => ({
        ...prev,
        fullName: parsed.name || prev.fullName,
        experience: parsed.yearsOfExperience || prev.experience,
        qualification: parsed.education || prev.qualification,
        description: parsed.summary || prev.description,
        skills: Array.isArray(parsed.skills)
          ? parsed.skills.join(", ")
          : parsed.skills || prev.skills,
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

    try {

      if (pdf) {
        formData.append("resumeFile", pdf)
      }

      formData.append("profileData", JSON.stringify(editData))

      const res = await fetch("/api/profile/candidate/updateDetails", {
        method: "PATCH",
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

      setCandidate(prev =>
        prev ? { ...prev, profileImageUrl: data.imageUrl } : null
      );

    } catch (err) {

      alert("Image upload failed");

    } finally {

      setIsUploading(false)

    }

  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900">

      <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-emerald-100/40 blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-amber-100/40 blur-[100px]" />

      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 flex items-center justify-between px-8 py-4">

        <h1 className="text-2xl font-black bg-linear-to-r from-amber-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
          WorkCred
        </h1>

        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
          <FaRegUserCircle className="w-6 h-6 text-emerald-600" />
        </div>

      </nav>

      <main className="relative grow container mx-auto px-6 py-12 space-y-10">

        <ProfileHeader
          candidate={candidate}
          handleUpload={handleUpload}
          isUploading={isuploading}
          onOpenEdit={() => setIsModalOpen(true)}
          setFile={setFile}
          onViewResume={() => setIsResumePreviewOpen(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <section className="lg:col-span-2 space-y-10">

            <EnrolledPath
              createdAt={candidate!.createdAt}
              stream={candidate!.stream}
            />

            <FeedbackSection
              ratings={pastRatings}
            />

          </section>

          <AcceptedRequests
            companies={acceptedCompanies}
            onSelectCompany={handleShowCompany}
          />

        </div>

      </main>

      <footer className="py-10 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          © 2026 <span className="font-bold text-slate-700 uppercase">WorkCred</span>
        </p>
      </footer>

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

      <ProfileCompanyDetailModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        company={selectedCompany}
      />

    </div>
  );

}