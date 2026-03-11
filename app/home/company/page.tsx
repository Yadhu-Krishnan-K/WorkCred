

// "use client";

// import Footer from "@/components/Footer";
// import Navbar from "@/components/navbar/company";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import {
//   FaRegUserCircle, FaSearch, FaChevronRight,
//   FaBolt, FaInbox, FaChartLine, FaBriefcase, FaTimes,
//   FaCommentDots
// } from "react-icons/fa";
// import { useRouter, useSearchParams } from "next/navigation"; // ✅ UPDATED

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
//   const searchParams = useSearchParams(); // ✅ NEW

//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [activeTab, setActiveTab] = useState<ViewMode>("top-candidates");
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Detail Views
//   const [activeJobApplicants, setActiveJobApplicants] = useState<any[]>([]);
//   const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
//   const [isDetailsLoading, setIsDetailsLoading] = useState(false);

//   // ===============================
//   // ✅ READ URL PARAMS (FROM NOTIFICATION)
//   // ===============================
//   useEffect(() => {

//     const job = searchParams.get("job");
//     const tab = searchParams.get("tab");

//     if (job && tab === "job-posts") {
//       setActiveTab("job-posts");
//       setSelectedId(job);
//     }

//   }, [searchParams]);

//   // ===============================
//   // Initial Data Fetch
//   // ===============================
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

//   // ===============================
//   // Fetch Applicants
//   // ===============================
//   useEffect(() => {

//     if (selectedId && activeTab === "job-posts") {

//       const fetchApplicants = async () => {

//         setIsDetailsLoading(true);

//         try {

//           const res = await fetch(`/api/jobApplicants/${selectedId}`);
//           const json = await res.json();

//           console.log("json = ", json);

//           setActiveJobApplicants(json.data || json || []);

//         } catch (e) {
//           console.error("Error fetching applicants:", e);
//         } finally {
//           setIsDetailsLoading(false);
//         }
//       };

//       fetchApplicants();

//     } else {
//       setActiveJobApplicants([]);
//     }

//   }, [selectedId, activeTab]);

//   // ===============================
//   // Selected Items
//   // ===============================
//   const selectedCandidate = candidates.find(
//     (c) => c._id === selectedId
//   );

//   const selectedJob = jobs.find(
//     (j) => j._id === selectedId
//   );

//   // ===============================
//   // Approve Candidate
//   // ===============================
//   async function approveCandidate(id: any) {

//     try {

//       const res = await fetch(
//         `/api/credConnect/company/job/accepted/${id}`,
//         { method: "PATCH" }
//       );

//       if (!res.ok) throw new Error("Update failed!");

//       setActiveJobApplicants((prev) => {

//         let ind = prev.findIndex((obj) => obj._id === id);

//         let newAr = [...prev];

//         if (newAr[ind]) {
//           newAr[ind].status = "Accepted";
//         }

//         console.log("Updated applicants =>", newAr);

//         return newAr;
//       });

//       alert("Successfully updated...");

//     } catch (error) {
//       console.error(error);
//       alert("Error updating status");
//     }
//   }

//   // ===============================
//   // ⬇️ YOUR RETURN CONTINUES BELOW
//   // ===============================



//   return (
//     <>
//       <Navbar />
//       <div className="h-screen bg-white flex overflow-hidden font-sans selection:bg-emerald-100 relative">

//         {/* --- LEFT SECTION: THE INBOX --- */}
//         <section className={`
//           flex-col bg-slate-50 border-r border-slate-200 transition-all duration-500 ease-in-out z-20
//           ${selectedId ? "hidden lg:flex lg:w-[400px]" : "flex w-full lg:w-[480px]"}
//         `}>
//           <div className="p-8 pb-4">
//             <div className="flex justify-between items-end mb-6">
//               <div>
//                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-1">Recruiter Hub</p>
//                 <h1 className="text-3xl font-black text-slate-900">Intelligence</h1>
//               </div>
//               <div className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
//                 <FaInbox />
//               </div>
//             </div>

//             <div className="relative group mb-6">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
//               <input
//                 type="text"
//                 placeholder={`Find in ${activeTab}...`}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-slate-200/50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all shadow-inner"
//               />
//             </div>

//             <div className="flex p-1.5 bg-slate-200/50 rounded-2xl gap-1">
//               {(["top-candidates",  "job-posts"] as ViewMode[]).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => { setActiveTab(tab); setSelectedId(null); }}
//                   className={`flex-1 py-2 text-[11px] font-black rounded-xl capitalize tracking-wider transition-all
//                     ${activeTab === tab ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"}`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto px-6 pb-28 space-y-3 custom-scrollbar">
//             {loading ? (
//               <div className="space-y-4">
//                 {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-200/60 rounded-3xl animate-pulse" />)}
//               </div>
//             ) : (
//               activeTab === 'job-posts' ? (
//                 <AnimatePresence mode="popLayout">
//                   {jobs.map((job) => (
//                     <motion.div
//                       key={job._id}
//                       layout
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       onClick={() => setSelectedId(job._id)}
//                       className={`group relative p-5 rounded-[2rem] cursor-pointer transition-all border-2
//                         ${selectedId === job._id ? "bg-white border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.02]" : "bg-transparent border-transparent hover:bg-white hover:border-slate-200"}`}
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all
//                           ${selectedId === job._id ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "bg-white text-slate-400 shadow-sm border border-slate-100"}`}>
//                           <FaBriefcase size={22} />
//                         </div>
//                         <div className="flex-1 overflow-hidden">
//                           <h4 className="font-black text-slate-800 text-base truncate">{job.role}</h4>
//                           <div className="flex items-center gap-2">
//                             <span className={`w-1.5 h-1.5 rounded-full ${job.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
//                             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{job.experience} Exp</p>
//                           </div>
//                         </div>
//                         <FaChevronRight className={`text-slate-300 transition-transform ${selectedId === job._id ? "text-emerald-500 translate-x-1" : "group-hover:translate-x-1"}`} />
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               ) : (
//                 <AnimatePresence mode="popLayout">
//                   {candidates.map((candidate) => (
//                     <motion.div
//                       key={candidate._id}
//                       layout
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       onClick={() => setSelectedId(candidate._id)}
//                       className={`group relative p-5 rounded-[2rem] cursor-pointer transition-all border-2
//                         ${selectedId === candidate._id ? "bg-white border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.02]" : "bg-transparent border-transparent hover:bg-white hover:border-slate-200"}`}
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="w-14 h-14 rounded-2xl overflow-hidden relative border border-slate-100 shadow-sm">
//                           {candidate.profileImageUrl ? (
//                             <img src={candidate.profileImageUrl} alt="" className="w-full h-full object-cover" />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-white text-slate-300"><FaRegUserCircle size={24} /></div>
//                           )}
//                         </div>
//                         <div className="flex-1 overflow-hidden">
//                           <h4 className="font-black text-slate-800 text-base truncate">{candidate.fullName}</h4>
//                           <p className="text-xs text-slate-500 font-bold opacity-70 tracking-tight">{candidate.email}</p>
//                         </div>
//                         <FaChevronRight className={`text-slate-300 transition-transform ${selectedId === candidate._id ? "text-emerald-500 translate-x-1" : "group-hover:translate-x-1"}`} />
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               )
//             )}
//           </div>
//         </section>

//         {/* --- RIGHT SECTION: THE CANVAS --- */}
//         <main className="flex-1 relative bg-white overflow-hidden">
//           <AnimatePresence mode="wait">
//             {!selectedId ? (
//               <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center p-12 text-center">
//                 <div className="relative mb-8">
//                   <div className="absolute inset-0 bg-emerald-500 blur-[100px] opacity-20 rounded-full" />
//                   <div className="relative w-32 h-32 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center shadow-inner">
//                     <FaChartLine size={48} className="text-emerald-500" />
//                   </div>
//                 </div>
//                 <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Ready to expand?</h2>
//                 <p className="text-slate-400 max-w-sm font-medium leading-relaxed">Select a profile or job post to view metrics and applications.</p>
//               </motion.div>
//             ) : (
//               <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">

//                 {/* Header */}
//                 <div className="p-12 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-8 mt-8 lg:mt-0">
//                   <div className="flex items-center gap-8">
//                     <div className="w-28 h-28 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl border-4 border-white overflow-hidden relative">
//                       {activeTab === "job-posts" ? (
//                         <FaBriefcase size={40} />
//                       ) : selectedCandidate?.profileImageUrl ? (
//                         <Image
//                           src={selectedCandidate.profileImageUrl}
//                           alt="candidate"
//                           fill
//                           className="object-cover"
//                         />
//                       ) : (
//                         <FaRegUserCircle size={50} />
//                       )}
//                     </div>
//                     <div>
//                       <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
//                         {activeTab === 'job-posts' ? selectedJob?.role : selectedCandidate?.fullName}
//                       </h2>
//                       <div className="flex items-center gap-4 mt-3">
//                         <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">
//                           {activeTab === 'job-posts' ? `Ref: ${selectedJob?._id.slice(-6)}` : 'Active Partner'}
//                         </span>
//                         <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
//                         <span className="text-slate-400 font-bold text-sm">
//                           {activeTab === 'job-posts' ? `${selectedJob?.experience} Experience` : selectedCandidate?.email}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <button className="h-14 px-8 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all flex items-center gap-3">
//                       {activeTab === 'job-posts' ? 'Edit Listing' : <><FaBolt /> Accept Project</>}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Body Content */}
//                 <div className="flex-1 overflow-y-auto p-12 bg-[#FBFBFC] custom-scrollbar">
//                   {activeTab === 'job-posts' ? (
//                     <div className="max-w-4xl space-y-10">
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div className="md:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
//                           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Role Requirements</h3>
//                           <p className="text-slate-700 text-lg leading-relaxed font-medium">{selectedJob?.requirements}</p>
//                         </div>
//                         <div className="space-y-4">
//                           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
//                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Status</p>
//                             <p className="text-xl font-bold">{selectedJob?.isActive ? 'Hiring' : 'Closed'}</p>
//                           </div>
//                           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
//                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total Apps</p>
//                             <p className="text-xl font-bold text-slate-900">{activeJobApplicants.length}</p>
//                           </div>
//                         </div>
//                       </div>



//                       <div className="space-y-6">
//                         <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest px-4">Applicants</h3>
//                         <div className="grid gap-3">
//                           {isDetailsLoading ? (
//                             <div className="p-10 text-center text-slate-400">Loading candidates...</div>
//                           ) : activeJobApplicants.length > 0 ? (
//                             activeJobApplicants.map((req: any) => (
//                               <motion.div
//                                 key={req._id}
//                                 whileHover={{ y: -4, scale: 1.01 }}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 onClick={() => setViewingCandidate(req)}
//                                 className="relative bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer group hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
//                               >
//                                 <div className="flex items-center gap-5">
//                                   {/* Profile Image with Status Ring */}
//                                   <div className="relative">
//                                     <div className="w-16 h-16 rounded-[1.75rem] bg-slate-50 overflow-hidden border-2 border-white shadow-inner">
//                                       {req.sender.id?.profileImageUrl ? (
//                                         <img src={req.sender.id.profileImageUrl} alt="" className="w-full h-full object-cover" />
//                                       ) : (
//                                         <div className="w-full h-full flex items-center justify-center text-slate-300"><FaRegUserCircle size={28} /></div>
//                                       )}
//                                     </div>
//                                     <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
//                                   </div>

//                                   <div>
//                                     <h4 className="font-black text-slate-800 text-lg tracking-tight group-hover:text-emerald-700 transition-colors">
//                                       {req.sender.id?.fullName || "Candidate"}
//                                     </h4>
//                                     <div className="flex items-center gap-2">
//                                       <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
//                                         {req.status}
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 {/* The Action Cluster */}
//                                 <div className="flex items-center gap-3">
//                                   {/* Mesmerizing Chat Button */}
//                                   <div
//                                     onClick={(e) => {
//                                       e.stopPropagation(); // Prevent opening modal
//                                     }}
//                                     className="group/chat relative p-4 rounded-2xl bg-slate-50 text-slate-400 overflow-hidden transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200 active:scale-90"
//                                   >
//                                     {(req.status === "ACCEPTED") && (
//                                       <button
//                                         onClick={(e) => {
//                                           e.stopPropagation();

//                                           const companyId = req.receiver.id;      // ✅ from API
//                                           console.log(companyId, 1919191919191919191919191919191919)
//                                           const candidateId = req.sender.id?._id; // ✅ from API

//                                           router.push(
//                                             `/chat?sender=${companyId}&receiver=${candidateId}`
//                                           );
//                                         }}
//                                         className="relative z-10"
//                                       >
//                                         <FaCommentDots
//                                           size={20}
//                                           className="transition-transform group-hover/chat:rotate-[15deg]"
//                                         />
//                                       </button>
//                                     )}

//                                     {/* Animated Background Pulse */}
//                                     <span className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-400 opacity-0 group-hover/chat:opacity-100 transition-opacity duration-300" />
//                                   </div>

//                                   {/* Subtle Arrow */}
//                                   <FaChevronRight className="text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
//                                 </div>
//                               </motion.div>
//                             ))
//                           ) : (
//                             <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 uppercase text-xs font-black">No applicants found</div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     /* Existing Candidate detail view goes here */
//                     <div className="p-10 bg-white rounded-3xl shadow-sm border border-slate-100">
//                       <h3 className="text-xl font-black text-slate-900 mb-4">Candidate Profile</h3>
//                       <p className="text-slate-600 font-medium">{selectedCandidate?.description || "No description provided."}</p>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </main>



//         {/* --- CANDIDATE DETAIL POPUP (MODAL) --- */}
//         <AnimatePresence>
//           {viewingCandidate && (
//             <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
//               <motion.div
//                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                 onClick={() => setViewingCandidate(null)}
//                 className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
//               />
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
//                 className="relative bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl p-10 overflow-hidden"
//               >
//                 <button onClick={() => setViewingCandidate(null)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
//                   <FaTimes size={20} />
//                 </button>
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-24 h-24 rounded-[2rem] bg-emerald-50 mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
//                     {viewingCandidate.profileImageUrl ? (
//                       <img src={viewingCandidate.profileImageUrl} alt="" className="w-full h-full object-cover" />
//                     ) : (
//                       <FaRegUserCircle size={40} className="text-emerald-500" />
//                     )}
//                   </div>
//                   <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{viewingCandidate.fullName}</h2>
//                   <p className="text-emerald-600 font-bold mb-8">{viewingCandidate.email}</p>

//                   <div className="w-full space-y-6 text-left">
//                     <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
//                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Experience</h4>
//                       <p className="text-slate-700 font-medium">{viewingCandidate.experience || "No details provided."}</p>
//                     </div>
//                     <div>
//                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Expertise</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {viewingCandidate.skills?.map(skill => (
//                           <span key={skill} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600">{skill}</span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   {/* Action Footer */}
//                   <div className="mt-10 grid grid-cols-2 gap-4 w-full relative">
//                     {/* Reject Button: Subtle Glassmorphism */}
//                     <button
//                       onClick={() => { /* Your Reject Logic */ setViewingCandidate(null); }}
//                       className="group relative py-4 bg-slate-50 border border-slate-200 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:bg-rose-50 hover:border-rose-100 hover:text-rose-600 active:scale-95"
//                     >
//                       <span className="relative z-10">Decline</span>
//                       <div className="absolute inset-0 bg-rose-100/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//                     </button>

//                     {/* Accept Button: The "Mesmerizing" Glow */}
//                     <button
//                       onClick={() => { /* Your Accept Logic */ setViewingCandidate(null); }}
//                       className="group relative py-4 bg-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest text-white overflow-hidden shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] active:scale-95"
//                     >
//                       {/* Animated Gradient Background */}
//                       <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                       <span className="relative z-10 flex items-center justify-center gap-2"
//                         onClick={() => approveCandidate(viewingCandidate._id)}
//                       >
//                         Approve Candidate
//                         <motion.span
//                           animate={{ x: [0, 4, 0] }}
//                           transition={{ repeat: Infinity, duration: 1.5 }}
//                         >
//                           →
//                         </motion.span>
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//       </div >
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

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<ViewMode>("top-candidates");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeJobApplicants, setActiveJobApplicants] = useState<any[]>([]);
  const [viewingCandidate, setViewingCandidate] = useState<any | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  /* ---------------- READ URL PARAMS ---------------- */

  useEffect(() => {

    const job = searchParams.get("job");
    const tab = searchParams.get("tab");

    if (job && tab === "job-posts") {
      setActiveTab("job-posts");
      setSelectedId(job);
    }

  }, [searchParams]);

  /* ---------------- INITIAL FETCH ---------------- */

  useEffect(() => {

    async function initFetch() {

      try {

        const [candisRes, jobsRes] = await Promise.all([
          fetch("/api/candidates"),
          fetch("/api/jobs")
        ]);

        const candisJson = await candisRes.json();
        const jobsJson = await jobsRes.json();

        setCandidates(candisJson.data || []);
        setJobs(jobsJson || []);

      } catch (e) {

        console.error("Init fetch error:", e);

      } finally {

        setLoading(false);

      }

    }

    initFetch();

  }, []);

  /* ---------------- FETCH JOB APPLICANTS ---------------- */

  useEffect(() => {

    if (selectedId && activeTab === "job-posts") {

      const fetchApplicants = async () => {

        setIsDetailsLoading(true);

        try {

          const res = await fetch(`/api/jobApplicants/${selectedId}`);
          const json = await res.json();

          setActiveJobApplicants(json.data || json || []);

        } catch (e) {

          console.error("Applicants fetch error:", e);

        } finally {

          setIsDetailsLoading(false);

        }

      };

      fetchApplicants();

    } else {

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

    try {

      const res = await fetch(
        `/api/credConnect/company/job/accepted/${id}`,
        { method: "PATCH" }
      );

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

      console.error(error);
      alert("Error updating status");

    }

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

        {/* LEFT SIDEBAR */}

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

        {/* RIGHT CONTENT */}

        <RightPanel
          activeTab={activeTab}
          selectedCandidate={selectedCandidate}
          selectedJob={selectedJob}
          selectedId={selectedId}
          activeJobApplicants={activeJobApplicants}
          isDetailsLoading={isDetailsLoading}
          setViewingCandidate={setViewingCandidate}
        />

        {/* MODAL */}

        <CandidateModal
          viewingCandidate={viewingCandidate}
          setViewingCandidate={setViewingCandidate}
          approveCandidate={approveCandidate}
        />

      </motion.div>

      <Footer />
    </>

  );

}