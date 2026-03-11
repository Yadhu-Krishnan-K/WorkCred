"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";

export default function CandidateModal({
  viewingCandidate,
  setViewingCandidate,
  approveCandidate
}: any) {

  return (

    <AnimatePresence>

      {viewingCandidate && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">

          {/* BACKDROP */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingCandidate(null)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* MODAL */}

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl p-10 overflow-hidden"
          >

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setViewingCandidate(null)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <div className="flex flex-col items-center text-center">

              {/* PROFILE IMAGE */}

              <div className="w-24 h-24 rounded-[2rem] bg-emerald-50 mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">

                {viewingCandidate.profileImageUrl ? (

                  <img
                    src={viewingCandidate.profileImageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <FaRegUserCircle size={40} className="text-emerald-500" />

                )}

              </div>

              {/* NAME */}

              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                {viewingCandidate.fullName}
              </h2>

              <p className="text-emerald-600 font-bold mb-8">
                {viewingCandidate.email}
              </p>

              {/* DETAILS */}

              <div className="w-full space-y-6 text-left">

                {/* EXPERIENCE */}

                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">

                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Experience
                  </h4>

                  <p className="text-slate-700 font-medium">
                    {viewingCandidate.experience || "No details provided."}
                  </p>

                </div>

                {/* SKILLS */}

                <div>

                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    Expertise
                  </h4>

                  <div className="flex flex-wrap gap-2">

                    {viewingCandidate.skills?.map((skill: any) => (

                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                      >
                        {skill}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

              {/* ACTION BUTTONS */}

              <div className="mt-10 grid grid-cols-2 gap-4 w-full relative">

                {/* DECLINE */}

                <button
                  onClick={() => setViewingCandidate(null)}
                  className="group relative py-4 bg-slate-50 border border-slate-200 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:bg-rose-50 hover:border-rose-100 hover:text-rose-600 active:scale-95"
                >
                  <span className="relative z-10">Decline</span>

                  <div className="absolute inset-0 bg-rose-100/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                </button>

                {/* APPROVE */}

                <button
                  onClick={() => approveCandidate(viewingCandidate._id)}
                  className="group relative py-4 bg-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest text-white overflow-hidden shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] active:scale-95"
                >

                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Approve Candidate

                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>

                  </span>

                </button>

              </div>

            </div>

          </motion.div>

        </div>

      )}

    </AnimatePresence>

  );

}