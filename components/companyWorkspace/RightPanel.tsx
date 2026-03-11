"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaBriefcase, FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";
import ApplicantsList from "./ApplicantsList";

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

          /* EMPTY STATE */

          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col items-center justify-center p-12 text-center"
          >

            <div className="relative mb-8">

              <div className="absolute inset-0 bg-emerald-500 blur-[100px] opacity-20 rounded-full" />

              <div className="relative w-32 h-32 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center shadow-inner">

                <FaChartLine size={48} className="text-emerald-500" />

              </div>

            </div>

            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">
              Ready to expand?
            </h2>

            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
              Select a profile or job post to view metrics and applications.
            </p>

          </motion.div>

        ) : (

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

                    <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">

                      {activeTab === "job-posts"
                        ? `Ref: ${selectedJob?._id?.slice(-6)}`
                        : "Active Partner"}

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

                <div className="p-10 bg-white rounded-3xl shadow-sm border border-slate-100">

                  <h3 className="text-xl font-black text-slate-900 mb-4">
                    Candidate Profile
                  </h3>

                  <p className="text-slate-600 font-medium">

                    {selectedCandidate?.description ||
                      "No description provided."}

                  </p>

                </div>

              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>

  );

}