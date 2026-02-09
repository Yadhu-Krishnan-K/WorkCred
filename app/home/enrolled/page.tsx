"use client";

import { motion } from "framer-motion";
import { FaRegUserCircle, FaBriefcase, FaLaptopCode, FaBuilding } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import JobDetailsModal from "@/components/candidate/JobDetailsModal"; // The new component below
import GigDetailsModal from "@/components/candidate/GigDetailsModal";
import CompanyDetailsModal from "@/components/candidate/CompanyDetailsModal";
import { JobDocument } from "@/model/jobmodel";
import { CompanyDocument } from "@/model/companymodel";
import Navbar from "@/components/navbar/candidate";
import Footer from "@/components/Footer";

// Example Mock Data - In a real app, you'd fetch this based on the 'selectedField'
// const jobs = [
//   { id: 1, title: "Senior Developer", company: "TechFlow", type: "Full-time", salary: "₹12L - ₹18L" },
//   { id: 2, title: "System Architect", company: "CloudScale", type: "Remote", salary: "₹20L+" },
// ];

const freelance = [
  { id: 1, title: "API Integration", budget: "₹15,000", duration: "2 weeks" },
  { id: 2, title: "UI Redesign", budget: "₹8,000", duration: "5 days" },
];




interface EnrolledHomeProps {
  selectedField: string; // e.g., "IT" or "MEDICAL"
}

export default function EnrolledHome({ selectedField }: EnrolledHomeProps) {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState<JobDocument | null>(null);
  const [selectedGig, setSelectedGig] = useState<{ id: number, title: string, budget: string, duration: string } | null>(null);
  const [selectedCo, setSelectedCo] = useState<{name:string} | null>(null);
  
  const [jobs, setJobs] = useState< JobDocument[] >([])
  const [companies, setCompanies] = useState<CompanyDocument[]>([])

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async() => {
    const res = await fetch('/api/enrolled/jobs')
    const data = await res.json()
    setJobs(data.jobs)
    setCompanies(data.companies)
  }



  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50">
        {/* Background glow - Slightly different color to signal "Enrolled" state */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100/40 blur-[120px]" />


        {/* Main Content */}
        <main className="relative grow container mx-auto px-6 py-12">

          {/* Header Section */}
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
              <p className="text-slate-500">Showing top opportunities in {selectedField}</p>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Column 1 & 2: Opportunities */}
            <div className="lg:col-span-2 space-y-8">

              {/* Jobs Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FaBriefcase className="text-emerald-600" />
                  <h3 className="text-xl font-bold text-slate-800">Latest Job Openings</h3>
                </div>
                <div className="space-y-4">
                  {jobs.map((job,index) => (
                    <motion.div
                      key={index}
                      onClick={() => setSelectedJob(job)} // Open on click
                      className="cursor-pointer group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-bold text-slate-800">{job.role}</h4>
                        <p className="text-sm text-slate-500">{job.role} • Full-Time</p>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-600 font-bold">{job.experience}</p>
                        <button className="text-xs font-bold text-slate-400 hover:text-emerald-600 underline">View Details</button>
                      </div>
                    </motion.div>
                  ))}

                </div>
                <div className="text-gray-400 font-semibold mt-2 w-full text-end pt-2">
                  <button className="p-1 border border-dashed rounded-2xl border-gray-300 cursor-pointer">...Load more</button>
                </div>
              </section>

              {/* Freelance Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FaLaptopCode className="text-emerald-600" />
                  <h3 className="text-xl font-bold text-slate-800">Freelance Gigs</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {freelance.map((gig) => (
                    <div 
                      key={gig.id} 
                      onClick={() => setSelectedGig(gig)} // Open on click
                      className="cursor-pointer hover:brightness-110 active:scale-95 transition-all bg-emerald-900 text-white p-5 rounded-2xl shadow-lg"
                    >
                      <h4 className="font-bold text-lg">{gig.title}</h4>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="bg-emerald-800 px-3 py-1 rounded-lg text-xs">{gig.budget}</span>
                        <span className="text-xs text-emerald-300">{gig.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-gray-400 font-semibold mt-2 w-full text-end pt-2">
                  <button className="p-1 border border-dashed rounded-2xl border-gray-300 cursor-pointer">...Load more</button>
                </div>
              </section>
            </div>

            {/* Column 3: Companies/Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FaBuilding className="text-emerald-600" />
                  <h3 className="font-bold text-slate-800">Top Companies</h3>
                </div>
                <div className="space-y-4">
                  {/* {["Google", "Microsoft", "Zoho", "Atlassian"].map((co) => ( */}
                  { companies.map((co,ind) => (
                    <div 
                      key={ind} 
                      onClick={() => setSelectedCo({ name: co.companyName })} // Open on click
                      className="cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                        {co.companyName[0]}
                      </div>
                      <span className="text-slate-700 font-medium">{co.companyName}</span>
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
        <AnimatePresence>
          {selectedJob && <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
          {selectedGig && <GigDetailsModal gig={selectedGig} onClose={() => setSelectedGig(null)} />}
          {selectedCo && <CompanyDetailsModal co={selectedCo} onClose={() => setSelectedCo(null)} />}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}