"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaBuilding, FaCommentDots, FaArrowRight, FaMapMarkerAlt, FaClock, FaLightbulb } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image"; // Added for optimized image handling

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

  const [jobs, setJobs] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const findAppliedJobs = (appliedJobs: any[], jobsData: any[]) => {
    //bruteforce
    for (let i = 0; i < appliedJobs.length; i++) {
      for (let j = 0; j < jobsData.length; j++) {
        if (appliedJobs[i].connect_Id == jobsData[j]._id) {
          jobsData[j].applied = true;
        } else if (!jobsData[j].applied) {
          jobsData[j].applied = false;
        }
      }
    }
    console.log('updated jobsData =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', jobsData)
  }

  const fetchData = async () => {
    try {
      console.log('fetching...')
      const [jobsRes, appliedJobsRes, companiesRes] = await Promise.all(
        [
          fetch("/api/enrolled/jobs"),
          fetch("/api/jobs/applied"),
          fetch("/api/enrolled/accepted")
        ]
      )
      const appliedJobs = await appliedJobsRes.json();
      const jobsData = await jobsRes.json();


      console.log('555555555555555555555555')
      //setting if the job is applied or not
      findAppliedJobs(appliedJobs.appliedJobRequests, jobsData.jobs);


      setJobs(jobsData.jobs || []);


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
    <div className="min-h-screen bg-[#f8fafc] selection:bg-indigo-100 overflow-x-hidden">
      <Navbar />

      {/* --- MESH GRADIENT & BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Left Top Circle - Drifts slowly in a triangle-like path */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, 30, 10, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px]"
        />

        {/* Right Middle Circle - Slow pulse and slight horizontal drift */}
        <motion.div
          animate={{
            x: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-100/40 blur-[100px]"
        />

        {/* Faded Background Illustration - Subtle rotation */}
        <motion.div
          animate={{ rotate: [12, 15, 12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[5%] opacity-[0.03]"
        >
          <img src="https://img.freepik.com/free-vector/global-connection-background_23-2148153406.jpg" alt="mesh" className="w-[800px]" />
        </motion.div>
      </div>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* --- HERO SECTION --- */}
        <header className="mb-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                }
              }}
              className="max-w-2xl"
            >
              {/* Badge Animation */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {session?.user?.stream || "General"} Sector
                </span>
              </motion.div>

              {/* Title Animation */}
              <div className="overflow-hidden">
                <motion.p
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                  className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4"
                >
                  Welcome, {session?.user?.name || "Explorer"}
                </motion.p>

                <motion.h1
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]"
                >
                  Build the career <br />
                  <span className="relative">
                    <span className="p-2 relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500">
                      you deserve.
                    </span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute bottom-2 left-0 h-3 bg-indigo-100 -z-10 hidden md:block"
                    ></motion.span>
                  </span>
                </motion.h1>
              </div>

              <motion.p
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="mt-6 text-lg text-slate-500 max-w-lg leading-relaxed"
              >
                Connect with industry leaders and unlock premium career paths tailored specifically to your expertise.
              </motion.p>

              {/* Added CTA animation
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8 flex gap-4"
              >
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                  Get Started
                </button>
              </motion.div> */}
            </motion.div>

            {/* Right Side: Floating Image Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden lg:block relative group"
            >
              {/* Animated Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[3rem] blur-2xl pointer-events-none"
              />

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[2.5rem] overflow-hidden border border-white/40 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                  alt="Abstract Digital Art"
                  className="w-full h-[450px] object-cover hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/70 text-sm font-medium uppercase tracking-[0.2em]"
                  >
                    Next-Gen Talent
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-white text-3xl font-bold"
                  >
                    Curated for Excellence.
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* --- JOBS FEED (8 COLUMNS) --- */}
          <section className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
                  <FaBriefcase className="text-white" size={18} />
                </div>
                Current Openings
              </h2>
              <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-500 font-semibold shadow-sm">
                {jobs.length} jobs found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedJob(job)}
                  className="group bg-white border border-slate-200 p-8 rounded-[2rem] cursor-pointer transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <FaArrowRight className="text-indigo-500 -rotate-45" size={20} />
                  </div>

                  <div className="flex flex-col h-full justify-between relative z-10">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:scale-110 transition-all duration-300">
                        <FaBuilding className="text-slate-400 group-hover:text-indigo-500" size={24} />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                        {job.role}
                      </h3>

                      {/* Added Company Name here */}
                      <div className="text-indigo-600 font-semibold text-sm mb-3">
                        {job.companyId.companyName}
                      </div>

                      <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                        <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-indigo-400" /> Remote</span>
                        <span className="flex items-center gap-1.5"><FaClock className="text-indigo-400" /> Full-time</span>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Experience</span>
                        <span className="text-sm font-extrabold text-slate-700">{job.experience}</span>
                      </div>
                      <span className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {job.applied ? "Applied" : "Apply Now"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- SIDEBAR (4 COLUMNS) --- */}
          <aside className="lg:col-span-4 space-y-8">

            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 sticky top-24 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <FaBuilding size={16} />
                </div>
                Your Connections
              </h3>

              <div className="space-y-4">
                {companies.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
                    <p className="text-sm text-slate-400">No active connections yet.</p>
                  </div>
                ) : (
                  companies.map((co, ind) => (
                    <motion.div
                      key={ind}
                      whileHover={{ x: 8 }}
                      className="group flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/30 transition-all"
                    >
                      <div
                        onClick={() => setSelectedCo(co)}
                        className="flex items-center gap-4 cursor-pointer"
                      >
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-100">
                          {co.profileImageUrl ? (
                            <Image
                              src={co.profileImageUrl}
                              alt={co.companyName || co.name || "Company Logo"}
                              width={48}
                              height={48}
                              className="object-cover"
                            // Optional: unoptimized={true} if the URL is from an external 
                            // source not configured in your next.config.js
                            />
                          ) : (
                            <span>{(co.companyName || co.name)?.[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">{co.companyName || co.name}</p>
                          <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">{co.isVerified ? "VERIFIED" : "NOT VERIFIED"}</p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToChat(co._id);
                        }}
                        className="p-3 rounded-xl bg-white text-slate-400 hover:text-indigo-600 hover:shadow-md transition-all border border-slate-100 hover:border-indigo-200"
                      >
                        <FaCommentDots size={20} />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <button className="w-full mt-10 py-4 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 group">
                Explore Network
                <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {/* --- MODALS --- */}
      <AnimatePresence>
        {selectedJob && <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        {selectedGig && <GigDetailsModal gig={selectedGig} onClose={() => setSelectedGig(null)} />}
        {selectedCo && <CompanyDetailsModal co={selectedCo} onClose={() => setSelectedCo(null)} />}
      </AnimatePresence>
    </div>
  );
}