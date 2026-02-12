
// "use client";

// import { motion } from "framer-motion";
// import {
//   FaRegUserCircle,
//   FaBriefcase,
//   FaLaptopCode,
//   FaBuilding,
// } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { AnimatePresence } from "framer-motion";

// import JobDetailsModal from "@/components/candidate/JobDetailsModal";
// import GigDetailsModal from "@/components/candidate/GigDetailsModal";
// import CompanyDetailsModal from "@/components/candidate/CompanyDetailsModal";

// import { JobDocument } from "@/model/jobmodel";
// import { CompanyDocument } from "@/model/companymodel";
// import { useSession } from "next-auth/react";

// const freelance = [
//   { id: 1, title: "API Integration", budget: "₹15,000", duration: "2 weeks" },
//   { id: 2, title: "UI Redesign", budget: "₹8,000", duration: "5 days" },
// ];

// interface EnrolledHomeProps {
//   selectedField: string;
// }

// export default function EnrolledHome({ selectedField }: EnrolledHomeProps) {

//   const router = useRouter();

//   const [selectedJob, setSelectedJob] = useState<JobDocument | null>(null);
//   const [selectedGig, setSelectedGig] = useState<{
//     id: number;
//     title: string;
//     budget: string;
//     duration: string;
//   } | null>(null);

//   const [selectedCo, setSelectedCo] = useState<{ name: string } | null>(null);

//   const [jobs, setJobs] = useState<JobDocument[]>([]);
//   const [companies, setCompanies] = useState<any[]>([]); // keep flexible

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ✅ UPDATED: filter accepted companies only
// const fetchData = async () => {
//   try {
//     // 1️⃣ Fetch jobs (same as before)
//     const jobsRes = await fetch("/api/enrolled/jobs");
//     const jobsData = await jobsRes.json();

//     setJobs(jobsData.jobs || []);

//     // 2️⃣ Fetch accepted companies (NO candidateId needed)
//     const companiesRes = await fetch("/api/enrolled/accepted");

//     const companiesData = await companiesRes.json();

//     console.log("Accepted Companies:", companiesData);

//     if (companiesData.success) {
//       setCompanies(companiesData.companies || []);
//     }

//   } catch (err) {
//     console.error("Fetch error:", err);
//   }
// };

//   return (
//     <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50">

//       {/* Background glow */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100/40 blur-[120px]" />

//       {/* Main Content */}
//       <main className="relative grow container mx-auto px-6 py-12">

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

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

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

//               <div className="text-gray-400 font-semibold mt-2 w-full text-end pt-2">
//                 <button className="p-1 border border-dashed rounded-2xl border-gray-300 cursor-pointer">
//                   ...Load more
//                 </button>
//               </div>
//             </section>

//             {/* Freelance */}
//             <section>
//               <div className="flex items-center gap-2 mb-4">
//                 <FaLaptopCode className="text-emerald-600" />
//                 <h3 className="text-xl font-bold text-slate-800">
//                   Freelance Gigs
//                 </h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {freelance.map((gig) => (
//                   <div
//                     key={gig.id}
//                     onClick={() => setSelectedGig(gig)}
//                     className="cursor-pointer hover:brightness-110 active:scale-95 transition-all bg-emerald-900 text-white p-5 rounded-2xl shadow-lg"
//                   >
//                     <h4 className="font-bold text-lg">{gig.title}</h4>

//                     <div className="mt-4 flex justify-between items-center">
//                       <span className="bg-emerald-800 px-3 py-1 rounded-lg text-xs">
//                         {gig.budget}
//                       </span>

//                       <span className="text-xs text-emerald-300">
//                         {gig.duration}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="text-gray-400 font-semibold mt-2 w-full text-end pt-2">
//                 <button className="p-1 border border-dashed rounded-2xl border-gray-300 cursor-pointer">
//                   ...Load more
//                 </button>
//               </div>
//             </section>
//           </div>

//           {/* Sidebar: Accepted Companies */}
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
//                     onClick={() =>
//                       setSelectedCo({ name: co.companyName || co.name })
//                     }
//                     className="cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all flex items-center gap-3"
//                   >
//                     <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400">
//                       {(co.companyName || co.name)?.[0]}
//                     </div>

//                     <span className="text-slate-700 font-medium">
//                       {co.companyName || co.name}
//                     </span>
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
//   );
// }

"use client";

import { motion } from "framer-motion";
import {
  FaRegUserCircle,
  FaBriefcase,
  FaLaptopCode,
  FaBuilding,
  FaCommentDots, // ✅ NEW
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import JobDetailsModal from "@/components/candidate/JobDetailsModal";
import GigDetailsModal from "@/components/candidate/GigDetailsModal";
import CompanyDetailsModal from "@/components/candidate/CompanyDetailsModal";

import { JobDocument } from "@/model/jobmodel";
import { CompanyDocument } from "@/model/companymodel";
import { useSession } from "next-auth/react"; // ✅ NEW

const freelance = [
  { id: 1, title: "API Integration", budget: "₹15,000", duration: "2 weeks" },
  { id: 2, title: "UI Redesign", budget: "₹8,000", duration: "5 days" },
];

interface EnrolledHomeProps {
  selectedField: string;
}

export default function EnrolledHome({ selectedField }: EnrolledHomeProps) {

  const router = useRouter();
  const { data: session } = useSession(); // ✅ NEW

  const [selectedJob, setSelectedJob] = useState<JobDocument | null>(null);
  const [selectedGig, setSelectedGig] = useState<{
    id: number;
    title: string;
    budget: string;
    duration: string;
  } | null>(null);

  const [selectedCo, setSelectedCo] = useState<{ name: string } | null>(null);

  const [jobs, setJobs] = useState<JobDocument[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      const jobsRes = await fetch("/api/enrolled/jobs");
      const jobsData = await jobsRes.json();

      setJobs(jobsData.jobs || []);

      const companiesRes = await fetch("/api/enrolled/accepted");
      const companiesData = await companiesRes.json();

      console.log("Accepted Companies:", companiesData);

      if (companiesData.success) {
        setCompanies(companiesData.companies || []);
      }

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ================= CHAT HANDLER =================
  const goToChat = (companyId: string) => {
    if (!session?.user?.id) return;

    const candidateId = session.user.id;

    router.push(
      `/chat?sender=${candidateId}&receiver=${companyId}`
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50">

      {/* Background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100/40 blur-[120px]" />

      {/* Main Content */}
      <main className="relative grow container mx-auto px-6 py-12">

        {/* Header */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase">
                {selectedField} Sector
              </span>

              <h2 className="text-4xl font-bold text-slate-900 mt-2">
                Welcome back, <span className="text-emerald-600">Pro</span>
              </h2>
            </div>

            <p className="text-slate-500">
              Showing top opportunities in {selectedField}
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Jobs + Freelance */}
          <div className="lg:col-span-2 space-y-8">

            {/* Jobs */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FaBriefcase className="text-emerald-600" />
                <h3 className="text-xl font-bold text-slate-800">
                  Latest Job Openings
                </h3>
              </div>

              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <motion.div
                    key={index}
                    onClick={() => setSelectedJob(job)}
                    className="cursor-pointer group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold text-slate-800">{job.role}</h4>
                      <p className="text-sm text-slate-500">
                        {job.role} • Full-Time
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-emerald-600 font-bold">
                        {job.experience}
                      </p>

                      <button className="text-xs font-bold text-slate-400 hover:text-emerald-600 underline">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Freelance */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FaLaptopCode className="text-emerald-600" />
                <h3 className="text-xl font-bold text-slate-800">
                  Freelance Gigs
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {freelance.map((gig) => (
                  <div
                    key={gig.id}
                    onClick={() => setSelectedGig(gig)}
                    className="cursor-pointer hover:brightness-110 active:scale-95 transition-all bg-emerald-900 text-white p-5 rounded-2xl shadow-lg"
                  >
                    <h4 className="font-bold text-lg">{gig.title}</h4>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="bg-emerald-800 px-3 py-1 rounded-lg text-xs">
                        {gig.budget}
                      </span>

                      <span className="text-xs text-emerald-300">
                        {gig.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-6">

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">

              <div className="flex items-center gap-2 mb-4">
                <FaBuilding className="text-emerald-600" />
                <h3 className="font-bold text-slate-800">
                  Accepted Companies
                </h3>
              </div>

              <div className="space-y-4">

                {companies.length === 0 && (
                  <p className="text-sm text-slate-400 text-center">
                    No accepted companies yet
                  </p>
                )}

                {companies.map((co, ind) => (
                  <div
                    key={ind}
                    className="cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all flex items-center justify-between"
                  >

                    {/* Left */}
                    <div
                      onClick={() =>
                        setSelectedCo({ name: co.companyName || co.name })
                      }
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                        {(co.companyName || co.name)?.[0]}
                      </div>

                      <span className="text-slate-700 font-medium">
                        {co.companyName || co.name}
                      </span>
                    </div>

                    {/* ✅ CHAT ICON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToChat(co._id);
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                    >
                      <FaCommentDots size={18} />
                    </button>

                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm font-bold hover:bg-slate-50 transition-colors">
                View All Companies
              </button>

            </div>
          </aside>
        </div>
      </main>

      {/* MODALS */}
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
  );
}