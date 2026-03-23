
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaBriefcase, FaRegUserCircle, FaStar } from "react-icons/fa";
import Image from "next/image";
import ApplicantsList from "./ApplicantsList";
import Lottie from "lottie-react";
import animationData from "../../app/assets/animation.json"

type ViewMode = "top-candidates" | "job-posts";

interface RightPanelProps {
  activeTab: ViewMode;
  selectedCandidate: any;
  selectedJob: any;
  selectedId: string | null;
  activeJobApplicants: any[];
  isDetailsLoading: boolean;
  setViewingCandidate: (c: any) => void;
}

export default function RightPanel({
  activeTab,
  selectedCandidate,
  selectedJob,
  selectedId,
  activeJobApplicants,
  isDetailsLoading,
  setViewingCandidate
}: RightPanelProps) {

  return (

    <main className="flex-1 relative bg-white overflow-hidden">

      <AnimatePresence mode="wait">
{!selectedId ? (

  <motion.div
    key="empty"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full flex flex-col items-center justify-center p-12 text-center relative overflow-hidden"
  >

    {/* Glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[400px] h-[400px] bg-blue-500 blur-[140px] opacity-20 rounded-full" />
    </div>

    {/* 🎬 Lottie Animation */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="w-[450px] h-[450px] mb-6"
    >
      <Lottie animationData={animationData} loop />
    </motion.div>

    <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">
      Ready to expand?
    </h2>

    <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
      Select a profile or job post to view metrics and applications.
    </p>

  </motion.div>

) :  (

          /* DETAIL VIEW */

          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full flex flex-col"
          >

            {/* HEADER */}

            <div className="p-12 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-8 mt-8 lg:mt-0">

              <div className="flex items-center gap-8">

                <div className="w-28 h-28 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl border-4 border-white overflow-hidden relative">

                  {activeTab === "job-posts" ? (

                    <FaBriefcase size={40} />

                  ) : selectedCandidate?.profileImageUrl ? (

                    <Image
                      src={selectedCandidate.profileImageUrl}
                      alt="candidate"
                      fill
                      className="object-cover"
                    />

                  ) : (

                    <FaRegUserCircle size={50} />

                  )}

                </div>

                <div>

                  <h2 className="text-5xl font-black text-slate-900 tracking-tighter">

                    {activeTab === "job-posts"
                      ? selectedJob?.role
                      : selectedCandidate?.fullName}

                  </h2>

                  <div className="flex items-center gap-4 mt-3">

                    <span className="text-blue-600 font-black text-xs uppercase tracking-widest">

                      {activeTab === "job-posts"
                        ? `Ref: ${selectedJob?._id?.slice(-6)}`
                        : "Candidate"}

                    </span>

                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />

                    <span className="text-slate-400 font-bold text-sm">

                      {activeTab === "job-posts"
                        ? `${selectedJob?.experience} Experience`
                        : selectedCandidate?.email}

                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* BODY */}

            <div className="flex-1 overflow-y-auto p-12 bg-[#FBFBFC] custom-scrollbar">

              {activeTab === "job-posts" ? (

                <div className="max-w-4xl space-y-10">

                  {/* JOB INFO */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="md:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">

                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        Role Requirements
                      </h3>

                      <p className="text-slate-700 text-lg leading-relaxed font-medium">
                        {selectedJob?.requirements}
                      </p>

                    </div>

                    <div className="space-y-4">

                      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">

                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                          Status
                        </p>

                        <p className="text-xl font-bold">

                          {selectedJob?.isActive ? "Hiring" : "Closed"}

                        </p>

                      </div>

                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">

                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                          Total Apps
                        </p>

                        <p className="text-xl font-bold text-slate-900">

                          {activeJobApplicants.length}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* APPLICANTS LIST */}

                  <ApplicantsList
                    activeJobApplicants={activeJobApplicants}
                    isDetailsLoading={isDetailsLoading}
                    setViewingCandidate={setViewingCandidate}
                  />

                </div>

              ) : (

                /* CANDIDATE PROFILE */

                <div className="p-10 bg-white rounded-3xl shadow-sm border border-slate-100 space-y-8">

                  <h3 className="text-xl font-black text-slate-900">
                    Candidate Profile
                  </h3>

                  {/* BASIC DETAILS */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                      <p className="font-semibold text-slate-800">
                        {selectedCandidate?.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Experience</p>
                      <p className="font-semibold text-slate-800">
                        {selectedCandidate?.experience} Years
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Qualification</p>
                      <p className="font-semibold text-slate-800">
                        {selectedCandidate?.qualification}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Stream</p>
                      <p className="font-semibold text-slate-800">
                        {selectedCandidate?.stream}
                      </p>
                    </div>

                  </div>

                  {/* ⭐ Rating */}

                  <div className="flex items-center gap-3">

                    <span className="text-sm font-bold text-slate-500">
                      Company Rating
                    </span>

                    <div className="flex items-center gap-1">

                      {[1,2,3,4,5].map((star)=>(
                        <FaStar
                          key={star}
                          className={
                            star <= Math.round(selectedCandidate?.avgRating || 0)
                              ? "text-yellow-400"
                              : "text-slate-300"
                          }
                        />
                      ))}

                    </div>

                    <span className="text-sm font-semibold text-slate-600">
                      {selectedCandidate?.avgRating?.toFixed(1) || "0.0"}
                    </span>

                  </div>

                  {/* SKILLS */}

                  <div>

                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">
                      Skills
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {selectedCandidate?.skills?.map((skill:string,index:number)=>(
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <div>

                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                      About
                    </p>

                    <p className="text-slate-600 font-medium leading-relaxed">
                      {selectedCandidate?.description || "No description provided."}
                    </p>

                  </div>

                  {/* RESUME */}

                  {selectedCandidate?.pdfUrl && (

                    <a
                      href={selectedCandidate.pdfUrl}
                      target="_blank"
                      className="inline-block mt-2 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition"
                    >
                      View Resume
                    </a>

                  )}

                </div>

              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>

  );

}