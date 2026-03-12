"use client";

import { motion } from "framer-motion";
import { FaChevronRight, FaRegUserCircle, FaCommentDots } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ApplicantsList({
  activeJobApplicants,
  isDetailsLoading,
  setViewingCandidate
}: any) {

  const router = useRouter();

  if (isDetailsLoading) {

    return (
      <div className="p-10 text-center text-slate-400">
        Loading candidates...
      </div>
    );

  }

  return (

    <div className="space-y-6">

      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest px-4">
        Applicants
      </h3>

      <div className="grid gap-3">

        {activeJobApplicants.length > 0 ? (

          activeJobApplicants.map((req: any) => (

            <motion.div
              key={req._id}
              whileHover={{ y: -4, scale: 1.01 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setViewingCandidate(req)}
              className="relative bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer group hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
            >

              <div className="flex items-center gap-5">

                {/* Profile Image */}

                <div className="relative">

                  <div className="w-16 h-16 rounded-[1.75rem] bg-slate-50 overflow-hidden border-2 border-white shadow-inner">

                    {req.sender?.id?.profileImageUrl ? (

                      <img
                        src={req.sender.id.profileImageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <FaRegUserCircle size={28} />
                      </div>

                    )}

                  </div>

                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />

                </div>

                {/* Candidate Info */}

                <div>

                  <h4 className="font-black text-slate-800 text-lg tracking-tight group-hover:text-emerald-700 transition-colors">

                    {req.sender?.id?.fullName || "Candidate"}

                  </h4>

                  <div className="flex items-center gap-2">

                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">

                      {req.status}

                    </span>

                  </div>

                </div>

              </div>

              {/* Actions */}

              <div className="flex items-center gap-3">

                {/* Chat Button */}

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="group/chat relative p-4 rounded-2xl bg-slate-50 text-slate-400 overflow-hidden transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200 active:scale-90"
                >

                  {(req.status === "ACCEPTED") && (

                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        const companyId = req.receiver.id;
                        const candidateId = req.sender.id?._id;

                        router.push(
                          `/chat?sender=${companyId}&receiver=${candidateId}`
                        );

                      }}
                      className="relative z-10"
                    >

                      <FaCommentDots
                        size={20}
                        className="transition-transform group-hover/chat:rotate-[15deg]"
                      />

                    </button>

                  )}

                  <span className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-400 opacity-0 group-hover/chat:opacity-100 transition-opacity duration-300" />

                </div>

                {/* Arrow */}

                <FaChevronRight className="text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />

              </div>

            </motion.div>

          ))

        ) : (

          <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 uppercase text-xs font-black">

            No applicants found

          </div>

        )}

      </div>

    </div>

  );

}