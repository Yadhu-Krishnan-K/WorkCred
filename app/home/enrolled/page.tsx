
// "use client";

// import { motion } from "framer-motion";
// import {
//   FaRegUserCircle,
//   FaBriefcase,
//   FaLaptopCode,
//   FaBuilding,
//   FaCommentDots, // ✅ NEW
// } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { AnimatePresence } from "framer-motion";

// import JobDetailsModal from "@/components/candidate/JobDetailsModal";
// import GigDetailsModal from "@/components/candidate/GigDetailsModal";
// import CompanyDetailsModal from "@/components/candidate/CompanyDetailsModal";

// import { JobDocument } from "@/model/jobmodel";
// import { CompanyDocument } from "@/model/companymodel";
// import Navbar from "@/components/navbar/candidate";
// import Footer from "@/components/Footer";
// import { useSession } from "next-auth/react"; // ✅ NEW

// const freelance = [
//   { id: 1, title: "API Integration", budget: "₹15,000", duration: "2 weeks" },
//   { id: 2, title: "UI Redesign", budget: "₹8,000", duration: "5 days" },
// ];

// interface EnrolledHomeProps {
//   selectedField: string;
// }

// export default function EnrolledHome({ selectedField }: EnrolledHomeProps) {

//   const router = useRouter();
//   const { data: session } = useSession(); // ✅ NEW

//   const [selectedJob, setSelectedJob] = useState<JobDocument | null>(null);
//   const [selectedGig, setSelectedGig] = useState<{
//     id: number;
//     title: string;
//     budget: string;
//     duration: string;
//   } | null>(null);

//   const [selectedCo, setSelectedCo] = useState<{ name: string } | null>(null);

//   const [jobs, setJobs] = useState<JobDocument[]>([]);
//   const [companies, setCompanies] = useState<any[]>([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ================= FETCH =================
//   const fetchData = async () => {
//     try {
//       const jobsRes = await fetch("/api/enrolled/jobs");
//       const jobsData = await jobsRes.json();

//       setJobs(jobsData.jobs || []);

//       const companiesRes = await fetch("/api/enrolled/accepted");
//       const companiesData = await companiesRes.json();

//       console.log("Accepted Companies:", companiesData);

//       if (companiesData.success) {
//         setCompanies(companiesData.companies || []);
//       }

//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   // ================= CHAT HANDLER =================
//   const goToChat = (companyId: string) => {
//     if (!session?.user?.id) return;

//     const candidateId = session.user.id;

//     router.push(
//       `/chat?sender=${candidateId}&receiver=${companyId}`
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50">
//         {/* Background glow - Slightly different color to signal "Enrolled" state */}
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100/40 blur-[120px]" />


//         {/* Main Content */}
//         <main className="relative grow container mx-auto px-6 py-12">

//         {/* Header */}
//         <header className="mb-12">
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col md:flex-row md:items-end justify-between gap-4"
//           >
//             <div>
//               <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase">
//                 {selectedField} Sector
//               </span>

//               <h2 className="text-4xl font-bold text-slate-900 mt-2">
//                 Welcome back, <span className="text-emerald-600">Pro</span>
//               </h2>
//             </div>

//             <p className="text-slate-500">
//               Showing top opportunities in {selectedField}
//             </p>
//           </motion.div>
//         </header>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* Jobs + Freelance */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* Jobs */}
//             <section>
//               <div className="flex items-center gap-2 mb-4">
//                 <FaBriefcase className="text-emerald-600" />
//                 <h3 className="text-xl font-bold text-slate-800">
//                   Latest Job Openings
//                 </h3>
//               </div>

//               <div className="space-y-4">
//                 {jobs.map((job, index) => (
//                   <motion.div
//                     key={index}
//                     onClick={() => setSelectedJob(job)}
//                     className="cursor-pointer group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center"
//                   >
//                     <div>
//                       <h4 className="font-bold text-slate-800">{job.role}</h4>
//                       <p className="text-sm text-slate-500">
//                         {job.role} • Full-Time
//                       </p>
//                     </div>

//                     <div className="text-right">
//                       <p className="text-emerald-600 font-bold">
//                         {job.experience}
//                       </p>

//                       <button className="text-xs font-bold text-slate-400 hover:text-emerald-600 underline">
//                         View Details
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </section>

//             {/* Freelance */}
          
//           </div>

//           {/* ================= SIDEBAR ================= */}
//           <aside className="space-y-6">

//             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">

//               <div className="flex items-center gap-2 mb-4">
//                 <FaBuilding className="text-emerald-600" />
//                 <h3 className="font-bold text-slate-800">
//                   Accepted Companies
//                 </h3>
//               </div>

//               <div className="space-y-4">

//                 {companies.length === 0 && (
//                   <p className="text-sm text-slate-400 text-center">
//                     No accepted companies yet
//                   </p>
//                 )}

//                 {companies.map((co, ind) => (
//                   <div
//                     key={ind}
//                     className="cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all flex items-center justify-between"
//                   >

//                     {/* Left */}
//                     <div
//                       onClick={() =>
//                         setSelectedCo({ name: co.companyName || co.name })
//                       }
//                       className="flex items-center gap-3 flex-1"
//                     >
//                       <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400">
//                         {(co.companyName || co.name)?.[0]}
//                       </div>

//                       <span className="text-slate-700 font-medium">
//                         {co.companyName || co.name}
//                       </span>
//                     </div>

//                     {/* ✅ CHAT ICON */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         goToChat(co._id);
//                       }}
//                       className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
//                     >
//                       <FaCommentDots size={18} />
//                     </button>

//                   </div>
//                 ))}
//               </div>

//               <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm font-bold hover:bg-slate-50 transition-colors">
//                 View All Companies
//               </button>

//             </div>
//           </aside>
//         </div>
//       </main>

//       {/* MODALS */}
//       <AnimatePresence>
//         {selectedJob && (
//           <JobDetailsModal
//             job={selectedJob}
//             onClose={() => setSelectedJob(null)}
//           />
//         )}

//         {selectedGig && (
//           <GigDetailsModal
//             gig={selectedGig}
//             onClose={() => setSelectedGig(null)}
//           />
//         )}

//         {selectedCo && (
//           <CompanyDetailsModal
//             co={selectedCo}
//             onClose={() => setSelectedCo(null)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//     <Footer/>
//     </>
//   );
// }
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaBuilding, FaCommentDots } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import JobDetailsModal from "@/components/candidate/JobDetailsModal";
import GigDetailsModal from "@/components/candidate/GigDetailsModal";
import CompanyDetailsModal from "@/components/candidate/CompanyDetailsModal";

import { JobDocument } from "@/model/jobmodel";
import Navbar from "@/components/navbar/candidate";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";

interface EnrolledHomeProps {
  selectedField: string;
}

export default function EnrolledHome({ selectedField }: EnrolledHomeProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedJob, setSelectedJob] = useState<JobDocument | null>(null);
  const [selectedGig, setSelectedGig] = useState<any | null>(null);
  const [selectedCo, setSelectedCo] = useState<{ name: string } | null>(null);

  const [jobs, setJobs] = useState<JobDocument[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jobsRes = await fetch("/api/enrolled/jobs");
      const jobsData = await jobsRes.json();
      setJobs(jobsData.jobs || []);

      const companiesRes = await fetch("/api/enrolled/accepted");
      const companiesData = await companiesRes.json();
      if (companiesData.success) {
        setCompanies(companiesData.companies || []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const goToChat = (companyId: string) => {
    if (!session?.user?.id) return;
    router.push(`/chat?sender=${session.user.id}&receiver=${companyId}`);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">

        {/* ================= HERO SECTION ================= */}
        <section className="border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
          <div className="container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
              <div>
                <span className="px-4 py-1 text-xs font-semibold tracking-widest uppercase rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  {selectedField} Sector
                </span>

                <h1 className="text-5xl font-bold mt-6 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                  Welcome back, Pro
                </h1>

                <p className="mt-4 text-slate-400 text-lg">
                  Explore the latest opportunities curated for you.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= MAIN CONTENT ================= */}
        <main className="container mx-auto px-6 py-14 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ================= JOBS SECTION ================= */}
            <div className="lg:col-span-2 space-y-8">

              <div className="flex items-center gap-3">
                <FaBriefcase className="text-orange-400 text-xl" />
                <h2 className="text-2xl font-semibold text-white">
                  Latest Job Openings
                </h2>
              </div>

              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    onClick={() => setSelectedJob(job)}
                    className="bg-slate-900 border border-slate-800 hover:border-orange-500/40 rounded-2xl p-6 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {job.role}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">
                          {job.role} • Full-Time
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-orange-400 font-semibold">
                          {job.experience}
                        </p>
                        <p className="text-xs text-slate-500 mt-2 underline hover:text-orange-400">
                          View Details
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <aside className="space-y-8">

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

                <div className="flex items-center gap-3 mb-6">
                  <FaBuilding className="text-orange-400 text-lg" />
                  <h3 className="text-lg font-semibold text-white">
                    Accepted Companies
                  </h3>
                </div>

                <div className="space-y-4">
                  {companies.length === 0 && (
                    <p className="text-sm text-slate-500 text-center">
                      No accepted companies yet
                    </p>
                  )}

                  {companies.map((co, ind) => (
                    <div
                      key={ind}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 transition"
                    >
                      <div
                        onClick={() =>
                          setSelectedCo({ name: co.companyName || co.name })
                        }
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold">
                          {(co.companyName || co.name)?.[0]}
                        </div>

                        <span className="text-slate-200">
                          {co.companyName || co.name}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToChat(co._id);
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 transition"
                      >
                        <FaCommentDots size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 py-3 rounded-xl border border-dashed border-slate-700 text-sm font-medium text-slate-400 hover:border-orange-500/40 hover:text-orange-400 transition">
                  View All Companies
                </button>

              </div>
            </aside>
          </div>
        </main>

        {/* ================= MODALS ================= */}
        <AnimatePresence>
          {selectedJob && (
            <JobDetailsModal
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          )}

          {selectedGig && (
            <GigDetailsModal
              gig={selectedGig}
              onClose={() => setSelectedGig(null)}
            />
          )}

          {selectedCo && (
            <CompanyDetailsModal
              co={selectedCo}
              onClose={() => setSelectedCo(null)}
            />
          )}
        </AnimatePresence>

      </div>

      <Footer />
    </>
  );
}