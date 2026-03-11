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

  return (

    <section
      className={`
        flex-col bg-slate-50 border-r border-slate-200
        transition-all duration-500 ease-in-out z-20
        ${selectedId ? "hidden lg:flex lg:w-[400px]" : "flex w-full lg:w-[480px]"}
      `}
    >

      {/* HEADER */}

      <div className="p-8 pb-4">

        <div className="flex justify-between items-end mb-6">

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-1">
              Recruiter Hub
            </p>

            <h1 className="text-3xl font-black text-slate-900">
              Intelligence
            </h1>
          </div>

          <div className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
            <FaInbox />
          </div>

        </div>

        {/* SEARCH */}

        <div className="relative group mb-6">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />

          <input
            type="text"
            placeholder={`Find in ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-200/50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all shadow-inner"
          />

        </div>

        {/* TAB SWITCH */}

        <div className="flex p-1.5 bg-slate-200/50 rounded-2xl gap-1">

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
                    ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }
              `}
            >

              {tab}

            </button>

          ))}

        </div>

      </div>

      {/* LIST AREA */}

      <div className="flex-1 overflow-y-auto px-6 pb-28 space-y-3 custom-scrollbar">

        {loading ? (

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-slate-200/60 rounded-3xl animate-pulse"
              />
            ))}
          </div>

        ) : activeTab === "job-posts" ? (

          <AnimatePresence mode="popLayout">

            {jobs.map((job: any) => (

              <motion.div
                key={job._id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedId(job._id)}
                className={`
                  group relative p-5 rounded-[2rem] cursor-pointer transition-all border-2
                  ${
                    selectedId === job._id
                      ? "bg-white border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.02]"
                      : "bg-transparent border-transparent hover:bg-white hover:border-slate-200"
                  }
                `}
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center transition-all
                      ${
                        selectedId === job._id
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                          : "bg-white text-slate-400 shadow-sm border border-slate-100"
                      }
                    `}
                  >
                    <FaBriefcase size={22} />
                  </div>

                  <div className="flex-1 overflow-hidden">

                    <h4 className="font-black text-slate-800 text-base truncate">
                      {job.role}
                    </h4>

                    <div className="flex items-center gap-2">

                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          job.isActive ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      />

                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                        {job.experience} Exp
                      </p>

                    </div>

                  </div>

                  <FaChevronRight
                    className={`
                      text-slate-300 transition-transform
                      ${
                        selectedId === job._id
                          ? "text-emerald-500 translate-x-1"
                          : "group-hover:translate-x-1"
                      }
                    `}
                  />

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        ) : (

          <AnimatePresence mode="popLayout">

            {candidates.map((candidate: any) => (

              <motion.div
                key={candidate._id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedId(candidate._id)}
                className={`
                  group relative p-5 rounded-[2rem] cursor-pointer transition-all border-2
                  ${
                    selectedId === candidate._id
                      ? "bg-white border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.02]"
                      : "bg-transparent border-transparent hover:bg-white hover:border-slate-200"
                  }
                `}
              >

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl overflow-hidden relative border border-slate-100 shadow-sm">

                    {candidate.profileImageUrl ? (

                      <img
                        src={candidate.profileImageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center bg-white text-slate-300">
                        <FaRegUserCircle size={24} />
                      </div>

                    )}

                  </div>

                  <div className="flex-1 overflow-hidden">

                    <h4 className="font-black text-slate-800 text-base truncate">
                      {candidate.fullName}
                    </h4>

                    <p className="text-xs text-slate-500 font-bold opacity-70 tracking-tight">
                      {candidate.email}
                    </p>

                  </div>

                  <FaChevronRight
                    className={`
                      text-slate-300 transition-transform
                      ${
                        selectedId === candidate._id
                          ? "text-emerald-500 translate-x-1"
                          : "group-hover:translate-x-1"
                      }
                    `}
                  />

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        )}

      </div>

    </section>

  );

}