
// "use client";

// import Footer from "@/components/Footer";
// import Navbar from "@/components/navbar/company";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import LeftPanel from "@/components/companyWorkspace/LeftPanel";
// import RightPanel from "@/components/companyWorkspace/RightPanel";
// import CandidateModal from "@/components/companyWorkspace/CandidateModal";

// /* ---------------- TYPES ---------------- */

// export interface Candidate {
//   _id: string;
//   fullName: string;
//   email: string;
//   isVerified: boolean;
//   description?: string;
//   experience?: string;
//   skills: string[];
//   qualification?: string;
//   avgRating: number;
//   profileImageUrl?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Job {
//   _id: string;
//   companyId: string;
//   role: string;
//   requirements: string;
//   experience: string;
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// type ViewMode = "top-candidates" | "job-posts";

// export default function CompanyWorkspace() {

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [activeTab, setActiveTab] = useState<ViewMode>("top-candidates");
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [activeJobApplicants, setActiveJobApplicants] = useState<any[]>([]);
//   const [viewingCandidate, setViewingCandidate] = useState<any | null>(null);
//   const [isDetailsLoading, setIsDetailsLoading] = useState(false);

//   /* ---------------- READ URL PARAMS ---------------- */

//   useEffect(() => {

//     const job = searchParams.get("job");
//     const tab = searchParams.get("tab");

//     if (job && tab === "job-posts") {
//       setActiveTab("job-posts");
//       setSelectedId(job);
//     }

//   }, [searchParams]);

//   /* ---------------- INITIAL FETCH ---------------- */

//   useEffect(() => {

//     async function initFetch() {

//       try {

//         const [candisRes, jobsRes] = await Promise.all([
//           fetch("/api/candidates"),
//           fetch("/api/jobs")
//         ]);

//         const candisJson = await candisRes.json();
//         const jobsJson = await jobsRes.json();

//         setCandidates(candisJson.data || []);
//         setJobs(jobsJson || []);

//       } catch (e) {

//         console.error("Init fetch error:", e);

//       } finally {

//         setLoading(false);

//       }

//     }

//     initFetch();

//   }, []);

//   /* ---------------- FETCH JOB APPLICANTS ---------------- */

//   useEffect(() => {

//     if (selectedId && activeTab === "job-posts") {

//       const fetchApplicants = async () => {

//         setIsDetailsLoading(true);

//         try {

//           const res = await fetch(`/api/jobApplicants/${selectedId}`);
//           const json = await res.json();

//           setActiveJobApplicants(json.data || json || []);

//         } catch (e) {

//           console.error("Applicants fetch error:", e);

//         } finally {

//           setIsDetailsLoading(false);

//         }

//       };

//       fetchApplicants();

//     } else {

//       setActiveJobApplicants([]);

//     }

//   }, [selectedId, activeTab]);

//   /* ---------------- SELECTED DATA ---------------- */

//   const selectedCandidate = candidates.find(
//     (c) => c._id === selectedId
//   );

//   const selectedJob = jobs.find(
//     (j) => j._id === selectedId
//   );

//   /* ---------------- APPROVE CANDIDATE ---------------- */

//   async function approveCandidate(id: any) {

//     try {

//       const res = await fetch(
//         `/api/credConnect/company/job/accepted/${id}`,
//         { method: "PATCH" }
//       );

//       if (!res.ok) throw new Error("Update failed!");

//       setActiveJobApplicants((prev) => {

//         const ind = prev.findIndex((obj) => obj._id === id);
//         const newArr = [...prev];

//         if (newArr[ind]) {
//           newArr[ind].status = "Accepted";
//         }

//         return newArr;

//       });

//       alert("Successfully updated...");

//     } catch (error) {

//       console.error(error);
//       alert("Error updating status");

//     }

//   }

//   /* ---------------- UI ---------------- */

//   return (

//     <>
//       <Navbar />

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 flex overflow-hidden relative"
//       >

//         {/* LEFT SIDEBAR */}

//         <LeftPanel
//           candidates={candidates}
//           jobs={jobs}
//           loading={loading}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           selectedId={selectedId}
//           setSelectedId={setSelectedId}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//         />

//         {/* RIGHT CONTENT */}

//         <RightPanel
//           activeTab={activeTab}
//           selectedCandidate={selectedCandidate}
//           selectedJob={selectedJob}
//           selectedId={selectedId}
//           activeJobApplicants={activeJobApplicants}
//           isDetailsLoading={isDetailsLoading}
//           setViewingCandidate={setViewingCandidate}
//         />

//         {/* MODAL */}

//         <CandidateModal
//           viewingCandidate={viewingCandidate}
//           setViewingCandidate={setViewingCandidate}
//           approveCandidate={approveCandidate}
//         />

//       </motion.div>

//       <Footer />
//     </>

//   );

// }
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/company";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react"; // ✅ ADDED

import LeftPanel from "@/components/companyWorkspace/LeftPanel";
import RightPanel from "@/components/companyWorkspace/RightPanel";
import CandidateModal from "@/components/companyWorkspace/CandidateModal";

/* ---------------- TYPES ---------------- */

export interface Candidate {
  _id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  description?: string;
  experience?: string;
  skills: string[];
  qualification?: string;
  avgRating: number;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  _id: string;
  companyId: string;
  role: string;
  requirements: string;
  experience: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type ViewMode = "top-candidates" | "job-posts";

export default function CompanyWorkspace() {

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ SESSION ADDED
  const { data: session, status } = useSession();

  console.log("🔥 [HOME PAGE] session status:", status);
  console.log("🔥 [HOME PAGE] session data:", session);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<ViewMode>("top-candidates");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeJobApplicants, setActiveJobApplicants] = useState<any[]>([]);
  const [viewingCandidate, setViewingCandidate] = useState<any | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  /* ---------------- 🔐 AUTH GUARD ---------------- */

  useEffect(() => {

    console.log("🧠 AUTH CHECK TRIGGERED");

    if (status === "loading") {
      console.log("⏳ Session still loading...");
      return;
    }

    if (status === "unauthenticated") {
      console.log("❌ No session → redirecting to login");
      router.push("/login/company");
      return;
    }

    console.log("✅ Authenticated user:", session?.user);

    if (session?.user?.role !== "COMPANY") {
      console.log("❌ Not a COMPANY → redirecting");
      router.push("/login/company");
      return;
    }

    console.log("🎉 COMPANY ACCESS GRANTED");

  }, [status, session, router]);

  /* ---------------- READ URL PARAMS ---------------- */

  useEffect(() => {

    console.log("📌 Reading URL params");

    const job = searchParams.get("job");
    const tab = searchParams.get("tab");

    if (job && tab === "job-posts") {
      console.log("➡️ Switching to job-posts tab:", job);
      setActiveTab("job-posts");
      setSelectedId(job);
    }

  }, [searchParams]);

  /* ---------------- INITIAL FETCH ---------------- */

  useEffect(() => {

    console.log("🚀 INIT FETCH STARTED");

    async function initFetch() {

      try {

        const [candisRes, jobsRes] = await Promise.all([
          fetch("/api/candidates"),
          fetch("/api/jobs")
        ]);

        console.log("📡 API RESPONSES:", candisRes.status, jobsRes.status);

        const candisJson = await candisRes.json();
        const jobsJson = await jobsRes.json();

        console.log("📊 Candidates:", candisJson);
        console.log("📊 Jobs:", jobsJson);

        setCandidates(candisJson.data || []);
        setJobs(jobsJson || []);

      } catch (e) {

        console.error("❌ Init fetch error:", e);

      } finally {

        console.log("✅ INIT FETCH DONE");
        setLoading(false);

      }

    }

    initFetch();

  }, []);

  /* ---------------- FETCH JOB APPLICANTS ---------------- */

  useEffect(() => {

    console.log("📥 Fetch applicants triggered");

    if (selectedId && activeTab === "job-posts") {

      console.log("➡️ Fetching applicants for job:", selectedId);

      const fetchApplicants = async () => {

        setIsDetailsLoading(true);

        try {

          const res = await fetch(`/api/jobApplicants/${selectedId}`);
          console.log("📡 Applicants API status:", res.status);

          const json = await res.json();
          console.log("📊 Applicants data:", json);

          setActiveJobApplicants(json.data || json || []);

        } catch (e) {

          console.error("❌ Applicants fetch error:", e);

        } finally {

          setIsDetailsLoading(false);

        }

      };

      fetchApplicants();

    } else {

      console.log("⚠️ No job selected / wrong tab");
      setActiveJobApplicants([]);

    }

  }, [selectedId, activeTab]);

  /* ---------------- SELECTED DATA ---------------- */

  const selectedCandidate = candidates.find(
    (c) => c._id === selectedId
  );

  const selectedJob = jobs.find(
    (j) => j._id === selectedId
  );

  /* ---------------- APPROVE CANDIDATE ---------------- */

  async function approveCandidate(id: any) {

    console.log("✅ Approving candidate:", id);

    try {

      const res = await fetch(
        `/api/credConnect/company/job/accepted/${id}`,
        { method: "PATCH" }
      );

      console.log("📡 Approve API status:", res.status);

      if (!res.ok) throw new Error("Update failed!");

      setActiveJobApplicants((prev) => {

        const ind = prev.findIndex((obj) => obj._id === id);
        const newArr = [...prev];

        if (newArr[ind]) {
          newArr[ind].status = "Accepted";
        }

        return newArr;

      });

      alert("Successfully updated...");

    } catch (error) {

      console.error("❌ Approve error:", error);
      alert("Error updating status");

    }

  }

  /* ---------------- DECLINE CANDIDATE ---------------- */

  async function declineCandidate(id: any) {

    console.log("❌ Declining candidate:", id);

    try {

      const res = await fetch(
        `/api/credConnect/company/job/rejected/${id}`,
        { method: "PATCH" }
      );

      console.log("📡 Decline API status:", res.status);

      if (!res.ok) throw new Error("Update failed!");

      setActiveJobApplicants((prev) => {

        const ind = prev.findIndex((obj) => obj._id === id);
        const newArr = [...prev];

        if (newArr[ind]) {
          newArr[ind].status = "REJECTED";
        }

        return newArr;

      });

      alert("Candidate rejected");

    } catch (error) {

      console.error("❌ Decline error:", error);
      alert("Error rejecting");

    }

  }

  /* ---------------- LOADING GUARD ---------------- */

  if (status === "loading") {
    console.log("⏳ Rendering loading screen...");
    return <div className="p-10 text-gray-500">Checking authentication...</div>;
  }

  /* ---------------- UI ---------------- */

  return (

    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 flex overflow-hidden relative"
      >

        <LeftPanel
          candidates={candidates}
          jobs={jobs}
          loading={loading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <RightPanel
          activeTab={activeTab}
          selectedCandidate={selectedCandidate}
          selectedJob={selectedJob}
          selectedId={selectedId}
          activeJobApplicants={activeJobApplicants}
          isDetailsLoading={isDetailsLoading}
          setViewingCandidate={setViewingCandidate}
        />

        <CandidateModal
          viewingCandidate={viewingCandidate}
          setViewingCandidate={setViewingCandidate}
          approveCandidate={approveCandidate}
          declineCandidate={declineCandidate}
        />

      </motion.div>

      <Footer />
    </>

  );

}