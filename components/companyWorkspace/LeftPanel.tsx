"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaInbox,
  FaSearch,
  FaChevronRight,
  FaBriefcase,
  FaRegUserCircle
} from "react-icons/fa";

/* ---------------- TYPES ---------------- */

type ViewMode = "top-candidates" | "job-posts";

interface LeftSidebarProps {
  candidates: any[];
  jobs: any[];
  loading: boolean;
  activeTab: ViewMode;
  setActiveTab: (tab: ViewMode) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function LeftSidebar({
  candidates,
  jobs,
  loading,
  activeTab,
  setActiveTab,
  selectedId,
  setSelectedId,
  searchQuery,
  setSearchQuery
}: LeftSidebarProps) {

  const tabs: ViewMode[] = ["top-candidates", "job-posts"];

  /* 🔥 SEARCH LOGIC (SAFE + CASE INSENSITIVE) */

  const query = searchQuery.toLowerCase().trim();

  const filteredCandidates = candidates.filter((c: any) => {
    if (!query) return true;

    return (
      c?.fullName?.toLowerCase().includes(query) ||
      c?.email?.toLowerCase().includes(query)
    );
  });

  const filteredJobs = jobs.filter((job: any) => {
    if (!query) return true;

    return job?.role?.toLowerCase().includes(query);
  });

  return (

    <section
      className={`
        flex-col bg-gradient-to-b from-blue-700 via-blue-700 to-blue-800
        transition-all duration-500 ease-in-out z-20
        ${selectedId ? "hidden lg:flex lg:w-[400px]" : "flex w-full lg:w-[480px]"}
      `}
    >

      {/* HEADER */}

      <div className="p-8 pb-4 text-white">

        <div className="flex justify-between items-end mb-6">

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-1">
              Recruiter Hub
            </p>

            <h1 className="text-3xl font-black">
              Intelligence
            </h1>
          </div>

          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
            <FaInbox />
          </div>

        </div>

        {/* SEARCH */}

        <div className="relative group mb-6">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200 group-focus-within:text-white transition-colors" />

          <input
            type="text"
            placeholder={`Find in ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/20 backdrop-blur border border-white/20 focus:border-white/40 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-blue-200 outline-none transition-all"
          />

        </div>

        {/* TAB SWITCH */}

        <div className="flex p-1.5 bg-white/10 rounded-2xl gap-1">

          {tabs.map((tab) => (

            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedId(null);
              }}
              className={`
                flex-1 py-2 text-[11px] font-black rounded-xl capitalize tracking-wider transition-all
                ${
                  activeTab === tab
                    ? "bg-white text-blue-700 shadow"
                    : "text-blue-200 hover:text-white"
                }
              `}
            >
              {tab}
            </button>

          ))}

        </div>

      </div>

      {/* LIST AREA */}

      <div className="flex-1 overflow-y-auto px-6 pb-28 space-y-3">

        {loading ? (

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-white/20 rounded-3xl animate-pulse"
              />
            ))}
          </div>

        ) : activeTab === "job-posts" ? (

          <AnimatePresence mode="popLayout">

            {filteredJobs.length === 0 ? (
              <p className="text-white text-sm text-center mt-6">
                No jobs found
              </p>
            ) : (
              filteredJobs.map((job: any) => (

                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedId(job._id)}
                  className={`
                    group relative p-5 rounded-[2rem] cursor-pointer transition-all border
                    ${
                      selectedId === job._id
                        ? "bg-white text-blue-800 border-white shadow-xl scale-[1.02]"
                        : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                    }
                  `}
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center transition-all
                        ${
                          selectedId === job._id
                            ? "bg-blue-700 text-white"
                            : "bg-white/20 text-white"
                        }
                      `}
                    >
                      <FaBriefcase size={22} />
                    </div>

                    <div className="flex-1 overflow-hidden">

                      <h4 className="font-black text-base truncate">
                        {job.role}
                      </h4>

                      <div className="flex items-center gap-2">

                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            job.isActive ? "bg-green-400" : "bg-gray-300"
                          }`}
                        />

                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
                          {job.experience} Exp
                        </p>

                      </div>

                    </div>

                    <FaChevronRight
                      className={`
                        transition-transform
                        ${
                          selectedId === job._id
                            ? "text-blue-600 translate-x-1"
                            : "text-white group-hover:translate-x-1"
                        }
                      `}
                    />

                  </div>

                </motion.div>

              ))
            )}

          </AnimatePresence>

        ) : (

          <AnimatePresence mode="popLayout">

            {filteredCandidates.length === 0 ? (
              <p className="text-white text-sm text-center mt-6">
                No candidates found
              </p>
            ) : (
              filteredCandidates.map((candidate: any) => (

                <motion.div
                  key={candidate._id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedId(candidate._id)}
                  className={`
                    group relative p-5 rounded-[2rem] cursor-pointer transition-all border
                    ${
                      selectedId === candidate._id
                        ? "bg-white text-blue-800 border-white shadow-xl scale-[1.02]"
                        : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                    }
                  `}
                >

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20">

                      {candidate.profileImageUrl ? (

                        <img
                          src={candidate.profileImageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />

                      ) : (

                        <div className="w-full h-full flex items-center justify-center text-white">
                          <FaRegUserCircle size={24} />
                        </div>

                      )}

                    </div>

                    <div className="flex-1 overflow-hidden">

                      <h4 className="font-black text-base truncate">
                        {candidate.fullName}
                      </h4>

                      <p className="text-xs opacity-80 tracking-tight">
                        {candidate.email}
                      </p>

                    </div>

                    <FaChevronRight
                      className={`
                        transition-transform
                        ${
                          selectedId === candidate._id
                            ? "text-blue-600 translate-x-1"
                            : "text-white group-hover:translate-x-1"
                        }
                      `}
                    />

                  </div>

                </motion.div>

              ))
            )}

          </AnimatePresence>

        )}

      </div>

    </section>

  );
}