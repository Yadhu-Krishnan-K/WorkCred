"use client";

import { JobDocument } from "@/model/jobmodel";
import { motion } from "framer-motion";
import { FaTimes, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from "react-icons/fa";

export default function JobDetailsModal({ job, onClose }: { job: any; onClose: () => void }) {

  const applyForJob = async () => {
    try {
      const res = await fetch("/api/credConnect/candidate/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          connectId: job._id,
          companyId: job.companyId._id,
          connectType: "JOB",
          message: `Applying for ${job.role}`,
        }),
      });
      console.log('res>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', res)
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to apply");
        return;
      }

      alert("Application sent successfully ✅");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };


  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Dark Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        layoutId={`job-${job.companyId}`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        {/* Decorative Top Glow */}
        <div className="absolute top-0 inset-x-0 h-2 bg-linear-to-r from-emerald-400 via-teal-500 to-emerald-600" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors z-10"
        >
          <FaTimes />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-2xl shadow-inner">
              <FaBriefcase />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">{job.role}</h2>
              <p className="text-emerald-600 font-bold tracking-wide uppercase text-sm">{job.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1 text-xs font-bold uppercase">
                <FaMoneyBillWave /> Salary
              </div>
              <p className="font-bold text-slate-800">{job.experience}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1 text-xs font-bold uppercase">
                <FaClock /> Type
              </div>
              <p className="font-bold text-slate-800">full time</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-slate-400 mb-1 text-xs font-bold uppercase">
                <FaMapMarkerAlt /> Location
              </div>
              <p className="font-bold text-slate-800">Remote / Bengaluru</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Role Overview</h4>
              <p className="text-slate-500 leading-relaxed">
                We are looking for a high-performing {job.role} to join our core team.
                You will be responsible for building scalable systems and collaborating with
                cross-functional teams to deliver excellence.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "TypeScript", "AWS"].map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              className={`flex-1 font-black py-4 rounded-2xl shadow-lg transition-all 
                ${job.applied
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed shadow-none" // Applied/Disabled state
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-200 active:scale-95" // Default state
                }`}
              onClick={applyForJob}
              disabled={job.applied} // Prevents the function from firing
            >
              {job.applied ? "Applied" : "Apply Now"}
            </button>
            {/* <button className="px-6 py-4 rounded-2xl border-2 border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
              Save
            </button> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}