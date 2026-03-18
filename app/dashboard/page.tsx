// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   FaBuilding,
//   FaUsers,
//   FaClipboardCheck,
//   FaChartLine,
//   FaArrowRight,
//   FaTimes,
//   FaEdit,
// } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// /* =====================
//    TYPES
// ===================== */

// type Job = {
//   _id: string;
//   role: string;
//   experience: string;
//   requirements: string;
//   createdAt: string;
// };

// /* =====================
//    HELPERS
// ===================== */

// const formatDateTime = (date: string) => {
//   return new Date(date).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// export default function CompanyDashboard() {
//   const router = useRouter();

//   /* =====================
//      JOB MODAL STATE
//   ===================== */
//   const [isJobModalOpen, setIsJobModalOpen] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const [jobForm, setJobForm] = useState({
//     role: "",
//     experience: "",
//     requirements: "",
//   });

//   /* =====================
//      JOB LIST STATE
//   ===================== */
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [jobsLoading, setJobsLoading] = useState(true);

//   /* =====================
//      FETCH JOBS
//   ===================== */
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setJobsLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   /* =====================
//      SAVE JOB
//   ===================== */
//   const handleSaveJob = async () => {
//     try {
//       const res = await fetch("/api/jobs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(jobForm),
//       });

//       if (!res.ok) throw new Error("Failed to create job");

//       const createdJob = await res.json();

//       setJobs((prev) => [createdJob, ...prev]);
//       setJobForm({ role: "", experience: "", requirements: "" });
//       setIsJobModalOpen(false);

//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 1800);
//     } catch (error) {
//       console.error("Save job error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">

//       {/* HEADER */}
//       <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
//         <h1 className="text-2xl font-black bg-gradient-to-r from-amber-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
//           WorkCred Dashboard
//         </h1>

//         <button
//           onClick={() => router.push("/profile/company")}
//           className="text-sm font-bold text-emerald-600 hover:underline"
//         >
//           View Profile
//         </button>
//       </header>

//       {/* MAIN */}
//       <main className="container mx-auto px-6 py-12 space-y-12">

//         {/* STATS */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <DashboardCard title="Active Candidates" value="24" icon={<FaUsers />} />
//           <DashboardCard title="Pending Requests" value="5" icon={<FaClipboardCheck />} />
//           <DashboardCard title="Verified Credentials" value="18" icon={<FaBuilding />} />
//           <DashboardCard title="Growth Rate" value="+12%" icon={<FaChartLine />} />
//         </section>

//         {/* QUICK ACTIONS */}
//         <section>
//           <h2 className="text-xl font-black mb-6">Quick Actions</h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <QuickAction
//               title="View Requests"
//               description="Review candidate credential requests"
//               onClick={() => router.push("/dashboard/requests")}
//             />

//             <QuickAction
//               title="Manage Jobs"
//               description="Create or manage job postings"
//               onClick={() => setIsJobModalOpen(true)}
//             />

//             <QuickAction
//               title="Messages"
//               description="Chat with accepted candidates"
//               onClick={() => router.push("/dashboard/messages")}
//             />
//           </div>
//         </section>

//         {/* POSTED JOBS */}
//         <section>
//           <h2 className="text-xl font-black mb-6">Posted Jobs</h2>

//           {jobsLoading ? (
//             <p className="text-slate-400">Loading jobs…</p>
//           ) : jobs.length === 0 ? (
//             <p className="text-slate-400">No jobs posted yet</p>
//           ) : (
//             <div className="grid gap-4">
//               {jobs.map((job) => (
//                 <motion.div
//                   key={job._id}
//                   whileHover={{ y: -3 }}
//                   className="bg-white border border-slate-200 rounded-2xl p-6 flex justify-between items-start shadow-sm"
//                 >
//                   <div>
//                     <h3 className="text-lg font-black">{job.role}</h3>

//                     <p className="text-sm text-slate-500 mt-1">
//                       Experience: {job.experience}
//                     </p>

//                     <p className="text-xs text-slate-400 mt-2 max-w-lg">
//                       {job.requirements}
//                     </p>

//                     <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
//                       Posted on {formatDateTime(job.createdAt)}
//                     </p>
//                   </div>

//                   {/* RIGHT SIDE */}
//                   <div className="flex flex-col items-end gap-3">
//                     <span className="text-xs font-black text-emerald-600">
//                       ACTIVE
//                     </span>

//                     {/* ✅ EDIT BUTTON */}
//                     <button
//                       onClick={() =>
//                         router.push(`/dashboard/jobs/${job._id}/edit`)
//                       }
//                       className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-emerald-600 transition"
//                     >
//                       <FaEdit /> Edit
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* ACTIVITY */}
//         <section>
//           <h2 className="text-xl font-black mb-6">Recent Activity</h2>

//           <div className="bg-white rounded-2xl border border-slate-200 divide-y">
//             <ActivityItem text="You accepted a credential request" />
//             <ActivityItem text="New candidate request received" />
//             <ActivityItem text="Job posted successfully" />
//           </div>
//         </section>
//       </main>

//       {/* JOB MODAL */}
//       {isJobModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
//           <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl relative">

//             <button
//               onClick={() => setIsJobModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
//             >
//               <FaTimes />
//             </button>

//             <h3 className="text-2xl font-black mb-6">
//               Create Job Posting
//             </h3>

//             <div className="space-y-4">
//               <input
//                 value={jobForm.role}
//                 onChange={(e) => setJobForm({ ...jobForm, role: e.target.value })}
//                 placeholder="Job Role"
//                 className="w-full border rounded-xl px-4 py-3"
//               />

//               <input
//                 value={jobForm.experience}
//                 onChange={(e) =>
//                   setJobForm({ ...jobForm, experience: e.target.value })
//                 }
//                 placeholder="Experience"
//                 className="w-full border rounded-xl px-4 py-3"
//               />

//               <textarea
//                 rows={4}
//                 value={jobForm.requirements}
//                 onChange={(e) =>
//                   setJobForm({ ...jobForm, requirements: e.target.value })
//                 }
//                 placeholder="Job Requirements"
//                 className="w-full border rounded-xl px-4 py-3 resize-none"
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-8">
//               <button
//                 onClick={() => setIsJobModalOpen(false)}
//                 className="px-5 py-3 rounded-xl text-slate-500"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSaveJob}
//                 className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-500"
//               >
//                 Save Job
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* SUCCESS MODAL */}
//       {showSuccess && (
//         <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-center justify-center">
//           <motion.div
//             initial={{ scale: 0.6, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             className="bg-white rounded-2xl px-10 py-8 shadow-2xl flex flex-col items-center gap-4"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
//               className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center"
//             >
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="3"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </motion.div>

//             <p className="text-lg font-black">Job Posted Successfully</p>
//             <p className="text-xs text-slate-400">Your job is now live</p>
//           </motion.div>
//         </div>
//       )}

//       {/* FOOTER */}
//       <footer className="py-10 border-t border-slate-200 text-center text-xs text-slate-400">
//         © 2026 <span className="font-bold">WorkCred</span>
//       </footer>
//     </div>
//   );
// }

// /* =====================
//    COMPONENTS
// ===================== */

// function DashboardCard({ title, value, icon }: any) {
//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center justify-between"
//     >
//       <div>
//         <p className="text-xs font-bold uppercase text-slate-400">{title}</p>
//         <p className="text-3xl font-black mt-1">{value}</p>
//       </div>
//       <div className="text-emerald-500 text-2xl">{icon}</div>
//     </motion.div>
//   );
// }

// function QuickAction({ title, description, onClick }: any) {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03 }}
//       onClick={onClick}
//       className="bg-slate-900 text-white rounded-2xl p-6 text-left shadow-xl"
//     >
//       <h3 className="font-black text-lg">{title}</h3>
//       <p className="text-sm text-slate-400 mt-2">{description}</p>
//       <div className="flex items-center gap-2 mt-4 text-emerald-400 text-sm font-bold">
//         Open <FaArrowRight />
//       </div>
//     </motion.button>
//   );
// }

// function ActivityItem({ text }: any) {
//   return (
//     <div className="px-6 py-4 text-sm text-slate-600">
//       {text}
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   FaArrowRight,
//   FaTimes,
//   FaEdit,
//   FaStar
// } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// /* =====================
// TYPES
// ===================== */

// type Job = {
//   _id: string;
//   role: string;
//   experience: string;
//   requirements: string;
//   createdAt: string;
// };

// /* =====================
// HELPERS
// ===================== */

// const formatDateTime = (date: string) => {
//   return new Date(date).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric"
//   });
// };

// export default function CompanyDashboard() {

//   const router = useRouter();

//   /* JOB MODAL */

//   const [isJobModalOpen,setIsJobModalOpen] = useState(false);
//   const [showSuccess,setShowSuccess] = useState(false);

//   const [jobForm,setJobForm] = useState({
//     role:"",
//     experience:"",
//     requirements:""
//   });

//   /* JOB LIST */

//   const [jobs,setJobs] = useState<Job[]>([]);
//   const [jobsLoading,setJobsLoading] = useState(true);

//   /* SUGGESTIONS */

// const [suggestions, setSuggestions] = useState<Record<string, any[]>>({});

//   /* =====================
//   FETCH JOBS
//   ===================== */

//   useEffect(()=>{

//     const fetchJobs = async()=>{

//       try{

//         const res = await fetch("/api/jobs");

//         if(!res.ok) throw new Error("Failed");

//         const data = await res.json();

//         setJobs(data);

//       }catch(err){

//         console.error(err);

//       }finally{

//         setJobsLoading(false);

//       }

//     };

//     fetchJobs();

//   },[]);

//   /* =====================
//   FETCH SUGGESTIONS
//   ===================== */

//   useEffect(()=>{

//     if(jobs.length === 0) return;

//     jobs.forEach(async(job)=>{

//       try{

//         const res = await fetch(`/api/jobs/${job._id}/suggestions`);

//         if(!res.ok) return;

//         const data = await res.json();

//         setSuggestions((prev: Record<string, any[]>) => ({
//   ...prev,
//   [job._id]: data
// }));

//       }catch(err){
//         console.error(err);
//       }

//     });

//   },[jobs]);

//   /* =====================
//   SAVE JOB
//   ===================== */

//   const handleSaveJob = async()=>{

//     try{

//       const res = await fetch("/api/jobs",{
//         method:"POST",
//         headers:{ "Content-Type":"application/json" },
//         body:JSON.stringify(jobForm)
//       });

//       if(!res.ok) throw new Error("Failed");

//       const createdJob = await res.json();

//       setJobs(prev=>[createdJob,...prev]);

//       setJobForm({
//         role:"",
//         experience:"",
//         requirements:""
//       });

//       setIsJobModalOpen(false);

//       setShowSuccess(true);

//       setTimeout(()=>setShowSuccess(false),1500);

//     }catch(err){

//       console.error(err);

//     }

//   };

//   return(

//     <div className="min-h-screen bg-slate-50">

//       {/* HEADER */}

//       <header className="bg-white border-b px-8 py-4 flex justify-between items-center">

//         <h1 className="text-2xl font-black text-slate-900">
//           Company Dashboard
//         </h1>

//         <button
//           onClick={()=>router.push("/profile/company")}
//           className="text-sm font-semibold text-emerald-600 hover:underline"
//         >
//           View Profile
//         </button>

//       </header>

//       {/* MAIN */}

//       <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

//         {/* QUICK ACTION */}

//         <div className="flex justify-between items-center">

//           <h2 className="text-xl font-black">
//             Posted Jobs
//           </h2>

//           <button
//             onClick={()=>setIsJobModalOpen(true)}
//             className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-emerald-500"
//           >
//             Post Job
//           </button>

//         </div>

//         {/* JOB LIST */}

//         {jobsLoading ?(

//           <p className="text-slate-400">
//             Loading jobs...
//           </p>

//         ):jobs.length===0?(
          
//           <p className="text-slate-400">
//             No jobs posted yet
//           </p>

//         ):(

//           <div className="space-y-4">

//             {jobs.map(job=>(

//               <motion.div
//                 key={job._id}
//                 whileHover={{y:-3}}
//                 className="bg-white border rounded-xl p-6 shadow-sm"
//               >

//                 <div className="flex justify-between items-start">

//                   <div>

//                     <h3 className="text-lg font-bold">
//                       {job.role}
//                     </h3>

//                     <p className="text-sm text-slate-500">
//                       Experience: {job.experience}
//                     </p>

//                     <p className="text-sm text-slate-400 mt-1 max-w-lg">
//                       {job.requirements}
//                     </p>

//                     <p className="text-xs text-slate-400 mt-2">
//                       Posted {formatDateTime(job.createdAt)}
//                     </p>

//                   </div>

//                   <button
//                     onClick={()=>router.push(`/dashboard/jobs/${job._id}/edit`)}
//                     className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-600"
//                   >
//                     <FaEdit/> Edit
//                   </button>

//                 </div>

//                 {/* SUGGESTED CANDIDATES */}

//                 {suggestions[job._id]?.length > 0 &&(

//                   <div className="mt-4 border-t pt-4">

//                     <p className="text-xs font-bold text-slate-400 uppercase mb-2">
//                       Suggested Candidates
//                     </p>

//                     <div className="flex flex-wrap gap-2">

//                       {suggestions[job._id].map((c:any)=>(

//                         <div
//                           key={c._id}
//                           className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-semibold"
//                         >
//                           {c.fullName}
//                           <FaStar className="text-yellow-400 text-[10px]" />
//                           {c.avgRating?.toFixed(1)}
//                         </div>

//                       ))}

//                     </div>

//                   </div>

//                 )}

//               </motion.div>

//             ))}

//           </div>

//         )}

//       </main>

//       {/* JOB MODAL */}

//       {isJobModalOpen &&(

//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

//           <div className="bg-white rounded-xl p-8 w-full max-w-md relative">

//             <button
//               onClick={()=>setIsJobModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-400"
//             >
//               <FaTimes/>
//             </button>

//             <h3 className="text-xl font-black mb-6">
//               Create Job
//             </h3>

//             <div className="space-y-4">

//               <input
//                 value={jobForm.role}
//                 onChange={e=>setJobForm({...jobForm,role:e.target.value})}
//                 placeholder="Job Role"
//                 className="w-full border rounded-lg px-4 py-2"
//               />

//               <input
//                 value={jobForm.experience}
//                 onChange={e=>setJobForm({...jobForm,experience:e.target.value})}
//                 placeholder="Experience"
//                 className="w-full border rounded-lg px-4 py-2"
//               />

//               <textarea
//                 rows={4}
//                 value={jobForm.requirements}
//                 onChange={e=>setJobForm({...jobForm,requirements:e.target.value})}
//                 placeholder="Requirements (React, Node, MongoDB)"
//                 className="w-full border rounded-lg px-4 py-2"
//               />

//             </div>

//             <div className="flex justify-end gap-3 mt-6">

//               <button
//                 onClick={()=>setIsJobModalOpen(false)}
//                 className="text-slate-500"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSaveJob}
//                 className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold"
//               >
//                 Save
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//       {/* SUCCESS */}

//       {showSuccess &&(

//         <div className="fixed inset-0 flex items-center justify-center bg-black/30">

//           <motion.div
//             initial={{scale:0.7,opacity:0}}
//             animate={{scale:1,opacity:1}}
//             className="bg-white px-8 py-6 rounded-xl shadow-xl"
//           >

//             <p className="font-bold">
//               Job posted successfully
//             </p>

//           </motion.div>

//         </div>

//       )}

//     </div>

//   );

// }
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaEdit, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

/* =====================
TYPES
===================== */

type Job = {
  _id: string;
  role: string;
  experience: string;
  requirements: string;
  createdAt: string;
};

/* =====================
HELPERS
===================== */

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function CompanyDashboard() {
  const router = useRouter();

  /* JOB MODAL */

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [jobForm, setJobForm] = useState({
    role: "",
    experience: "",
    requirements: "",
  });

  /* JOB LIST */

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  /* SUGGESTIONS */

  const [suggestions, setSuggestions] = useState<Record<string, any[]>>({});

  /* =====================
  FETCH JOBS
  ===================== */

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* =====================
  FETCH SUGGESTIONS
  ===================== */

  useEffect(() => {
    if (jobs.length === 0) return;

    jobs.forEach(async (job) => {
      try {
        const res = await fetch(`/api/jobs/${job._id}/suggestions`);

        if (!res.ok) return;

        const data = await res.json();

        setSuggestions((prev) => ({
          ...prev,
          [job._id]: data,
        }));
      } catch (err) {
        console.error(err);
      }
    });
  }, [jobs]);

  /* =====================
  SAVE JOB
  ===================== */

  const handleSaveJob = async () => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      });

      if (!res.ok) throw new Error("Failed");

      const createdJob = await res.json();

      setJobs((prev) => [createdJob, ...prev]);

      setJobForm({
        role: "",
        experience: "",
        requirements: "",
      });

      setIsJobModalOpen(false);

      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}

      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-900">
          Company Dashboard
        </h1>

        <button
          onClick={() => router.push("/profile/company")}
          className="text-sm font-semibold text-emerald-600 hover:underline"
        >
          View Profile
        </button>
      </header>

      {/* MAIN */}

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* ACTION BAR */}

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black">Posted Jobs</h2>

          <button
            onClick={() => setIsJobModalOpen(true)}
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-emerald-500"
          >
            Post Job
          </button>
        </div>

        {/* JOB LIST */}

        {jobsLoading ? (
          <p className="text-slate-400">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-slate-400">No jobs posted yet</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ y: -3 }}
                className="bg-white border rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{job.role}</h3>

                    <p className="text-sm text-slate-500">
                      Experience: {job.experience}
                    </p>

                    <p className="text-sm text-slate-400 mt-1 max-w-lg">
                      {job.requirements}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      Posted {formatDateTime(job.createdAt)}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/dashboard/jobs/${job._id}/edit`)
                    }
                    className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-600"
                  >
                    <FaEdit /> Edit
                  </button>
                </div>

                {/* SUGGESTED CANDIDATES */}

                <div className="mt-4 border-t pt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                    Suggested Candidates
                  </p>

                  {suggestions[job._id]?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {suggestions[job._id].map((c: any) => (
                        <div
                          key={c._id}
                          className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-semibold"
                        >
                          {c.fullName}

                          <FaStar className="text-yellow-400 text-[10px]" />

                          {Number(c.avgRating || 0).toFixed(1)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">
                      No suggestions available
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* JOB MODAL */}

      {isJobModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setIsJobModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-black mb-6">Create Job</h3>

            <div className="space-y-4">
              <input
                value={jobForm.role}
                onChange={(e) =>
                  setJobForm({ ...jobForm, role: e.target.value })
                }
                placeholder="Job Role"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                value={jobForm.experience}
                onChange={(e) =>
                  setJobForm({ ...jobForm, experience: e.target.value })
                }
                placeholder="Experience"
                className="w-full border rounded-lg px-4 py-2"
              />

              <textarea
                rows={4}
                value={jobForm.requirements}
                onChange={(e) =>
                  setJobForm({ ...jobForm, requirements: e.target.value })
                }
                placeholder="Requirements (React, Node, MongoDB)"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="text-slate-500"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveJob}
                className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MESSAGE */}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white px-8 py-6 rounded-xl shadow-xl"
          >
            <p className="font-bold">Job posted successfully</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}