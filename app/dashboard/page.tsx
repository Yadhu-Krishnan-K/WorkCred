
// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaTimes, FaEdit, FaStar } from "react-icons/fa";
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
//     year: "numeric",
//   });
// };

// export default function CompanyDashboard() {
//   const router = useRouter();

//   /* JOB MODAL */

//   const [isJobModalOpen, setIsJobModalOpen] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const [jobForm, setJobForm] = useState({
//     role: "",
//     experience: "",
//     requirements: "",
//   });

//   /* JOB LIST */

//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [jobsLoading, setJobsLoading] = useState(true);

//   /* SUGGESTIONS */

//   const [suggestions, setSuggestions] = useState<Record<string, any[]>>({});

//   /* =====================
//   FETCH JOBS
//   ===================== */

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch("/api/jobs");

//         if (!res.ok) throw new Error("Failed");

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
//   FETCH SUGGESTIONS
//   ===================== */

//   useEffect(() => {
//     if (jobs.length === 0) return;

//     jobs.forEach(async (job) => {
//       try {
//         const res = await fetch(`/api/jobs/${job._id}/suggestions`);

//         if (!res.ok) return;

//         const data = await res.json();

//         setSuggestions((prev) => ({
//           ...prev,
//           [job._id]: data,
//         }));
//       } catch (err) {
//         console.error(err);
//       }
//     });
//   }, [jobs]);

//   /* =====================
//   SAVE JOB
//   ===================== */

//   const handleSaveJob = async () => {
//     try {
//       const res = await fetch("/api/jobs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(jobForm),
//       });

//       if (!res.ok) throw new Error("Failed");

//       const createdJob = await res.json();

//       setJobs((prev) => [createdJob, ...prev]);

//       setJobForm({
//         role: "",
//         experience: "",
//         requirements: "",
//       });

//       setIsJobModalOpen(false);

//       setShowSuccess(true);

//       setTimeout(() => setShowSuccess(false), 1500);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* HEADER */}

//       <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-black text-slate-900">
//           Company Dashboard
//         </h1>

//         <button
//           onClick={() => router.push("/profile/company")}
//           className="text-sm font-semibold text-emerald-600 hover:underline"
//         >
//           View Profile
//         </button>
//       </header>

//       {/* MAIN */}

//       <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
//         {/* ACTION BAR */}

//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-black">Posted Jobs</h2>

//           <button
//             onClick={() => setIsJobModalOpen(true)}
//             className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-emerald-500"
//           >
//             Post Job
//           </button>
//         </div>

//         {/* JOB LIST */}

//         {jobsLoading ? (
//           <p className="text-slate-400">Loading jobs...</p>
//         ) : jobs.length === 0 ? (
//           <p className="text-slate-400">No jobs posted yet</p>
//         ) : (
//           <div className="space-y-4">
//             {jobs.map((job) => (
//               <motion.div
//                 key={job._id}
//                 whileHover={{ y: -3 }}
//                 className="bg-white border rounded-xl p-6 shadow-sm"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-bold">{job.role}</h3>

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
//                     onClick={() =>
//                       router.push(`/dashboard/jobs/${job._id}/edit`)
//                     }
//                     className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-600"
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                 </div>

//                 {/* SUGGESTED CANDIDATES */}

//                 <div className="mt-4 border-t pt-4">
//                   <p className="text-xs font-bold text-slate-400 uppercase mb-2">
//                     Suggested Candidates
//                   </p>

//                   {suggestions[job._id]?.length ? (
//                     <div className="flex flex-wrap gap-2">
//                       {suggestions[job._id].map((c: any) => (
//                         <div
//                           key={c._id}
//                           className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-semibold"
//                         >
//                           {c.fullName}

//                           <FaStar className="text-yellow-400 text-[10px]" />

//                           {Number(c.avgRating || 0).toFixed(1)}
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-xs text-slate-400">
//                       No suggestions available
//                     </p>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* JOB MODAL */}

//       {isJobModalOpen && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-8 w-full max-w-md relative">
//             <button
//               onClick={() => setIsJobModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-400"
//             >
//               <FaTimes />
//             </button>

//             <h3 className="text-xl font-black mb-6">Create Job</h3>

//             <div className="space-y-4">
//               <input
//                 value={jobForm.role}
//                 onChange={(e) =>
//                   setJobForm({ ...jobForm, role: e.target.value })
//                 }
//                 placeholder="Job Role"
//                 className="w-full border rounded-lg px-4 py-2"
//               />

//               <input
//                 value={jobForm.experience}
//                 onChange={(e) =>
//                   setJobForm({ ...jobForm, experience: e.target.value })
//                 }
//                 placeholder="Experience"
//                 className="w-full border rounded-lg px-4 py-2"
//               />

//               <textarea
//                 rows={4}
//                 value={jobForm.requirements}
//                 onChange={(e) =>
//                   setJobForm({ ...jobForm, requirements: e.target.value })
//                 }
//                 placeholder="Requirements (React, Node, MongoDB)"
//                 className="w-full border rounded-lg px-4 py-2"
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setIsJobModalOpen(false)}
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

//       {/* SUCCESS MESSAGE */}

//       {showSuccess && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/30">
//           <motion.div
//             initial={{ scale: 0.7, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white px-8 py-6 rounded-xl shadow-xl"
//           >
//             <p className="font-bold">Job posted successfully</p>
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

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [jobForm, setJobForm] = useState({
    role: "",
    experience: "",
    requirements: "",
  });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  const [suggestions, setSuggestions] = useState<Record<string, any[]>>({});

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-900">
          Company Dashboard
        </h1>

        <button
          onClick={() => router.push("/profile/company")}
          className="text-sm font-semibold text-orange-600 hover:underline"
        >
          View Profile
        </button>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        
        {/* ACTION BAR */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-800">Posted Jobs</h2>

          <button
            onClick={() => setIsJobModalOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:scale-105 hover:shadow-orange-200 transition"
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
                className="bg-white border border-orange-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:shadow-orange-100 transition relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{job.role}</h3>

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
                    className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-orange-600 transition"
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
                          className="flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-xs font-semibold"
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
          <div className="bg-white rounded-xl p-8 w-full max-w-md relative shadow-xl border border-orange-100">
            
            <button
              onClick={() => setIsJobModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-orange-500"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-black mb-6 text-slate-900">
              Create Job
            </h3>

            <div className="space-y-4">
              <input
                value={jobForm.role}
                onChange={(e) =>
                  setJobForm({ ...jobForm, role: e.target.value })
                }
                placeholder="Job Role"
                className="w-full border border-orange-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <input
                value={jobForm.experience}
                onChange={(e) =>
                  setJobForm({ ...jobForm, experience: e.target.value })
                }
                placeholder="Experience"
                className="w-full border border-orange-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <textarea
                rows={4}
                value={jobForm.requirements}
                onChange={(e) =>
                  setJobForm({ ...jobForm, requirements: e.target.value })
                }
                placeholder="Requirements (React, Node, MongoDB)"
                className="w-full border border-orange-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="text-slate-500 hover:text-orange-500"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveJob}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 transition"
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
            className="bg-white px-8 py-6 rounded-xl shadow-xl border border-orange-100"
          >
            <p className="font-bold text-orange-600">
              Job posted successfully
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}