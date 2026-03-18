"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaBuilding, FaCommentDots, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import JobDetailsModal from "@/components/candidate/JobDetailsModal";
import GigDetailsModal from "@/components/candidate/GigDetailsModal";
import CompanyDetailsModal from "@/components/candidate/CompanyDetailsModal";

import { JobDocument } from "@/model/jobmodel";
import Navbar from "@/components/navbar/candidate";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";



export default function EnrolledUI() {
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

      {/* Changed bg to gray-50 and text to gray-900 */}
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

        {/* ================= HERO SECTION ================= */}
        {/* Changed gradient to be very subtle light blue/gray */}
        <section className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
              <div>
                <span className="px-4 py-1 text-xs font-semibold tracking-widest uppercase rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  {session?.user.stream} Sector
                </span>

                <h1 className="text-5xl font-bold mt-6 text-gray-900">
                  Welcome  <span className="text-blue-500">{session?.user?.name}</span>
                </h1>

                <p className="mt-4 text-gray-500 text-lg">
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
                <FaBriefcase className="text-blue-500 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">
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
                    // {/* Changed to white card with gray border and shadow-md */}
                    className="bg-white border border-gray-200 hover:border-blue-500/40 rounded-xl p-6 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {job.role}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {job.role} • Full-Time
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-blue-600 font-bold">
                          {job.experience}
                        </p>
                        <p className="text-xs text-blue-500 mt-2 font-medium flex items-center gap-1">
                          View Details <FaArrowRight size={10} />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <aside className="space-y-8">

              {/* Sidebar card styling updated to match login card style */}
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">

                <div className="flex items-center gap-3 mb-6">
                  <FaBuilding className="text-blue-500 text-lg" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Accepted Companies
                  </h3>
                </div>

                <div className="space-y-4">
                  {companies.length === 0 && (
                    <p className="text-sm text-gray-400 text-center">
                      No accepted companies yet
                    </p>
                  )}

                  {companies.map((co, ind) => (
                    <div
                      key={ind}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
                    >
                      <div
                        onClick={() =>
                          setSelectedCo({ name: co.companyName || co.name })
                        }
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold">
                          {(co.companyName || co.name)?.[0]}
                        </div>

                        <span className="text-gray-700 font-medium">
                          {co.companyName || co.name}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToChat(co._id);
                        }}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition"
                      >
                        <FaCommentDots size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 py-3 rounded-lg border border-blue-500 text-sm font-bold text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
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