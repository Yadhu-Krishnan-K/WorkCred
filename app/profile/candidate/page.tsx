"use client";

import { motion } from "framer-motion";
import { 
  FaRegUserCircle, 
  FaStar, 
  FaBuilding, 
  FaCheckCircle, 
  FaArrowRight, 
  FaAward 
} from "react-icons/fa";

const enrolledTopics = [
  { title: "IT", status: "In Progress", progress: 65 },
  { title: "AGRICULTURE", status: "Completed", progress: 100 },
];

const acceptedCompanies = [
  { name: "TechNova Corp", industry: "Cloud Solutions", date: "Jan 20, 2026" },
  { name: "GreenRoot Systems", industry: "AgriTech", date: "Jan 15, 2026" },
  { name: "Nexus Auto", industry: "EV Engineering", date: "Dec 28, 2025" },
];

const pastRatings = [
  { company: "Global Finance", rating: 5, comment: "Excellent interview process and transparent communication.", date: "2 days ago" },
  { company: "BioHealth Lab", rating: 4, comment: "Great mentorship, but the onboarding was a bit slow.", date: "1 month ago" },
];

export default function CandidateProfile() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-emerald-100/40 blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-amber-100/40 blur-[100px]" />

      {/* Navbar (Same as Home) */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-black bg-gradient-to-r from-amber-500 via-orange-600 to-red-500 bg-clip-text text-transparent cursor-pointer">
          WorkCred
        </h1>
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Alex Johnson</span>
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
                <FaRegUserCircle className="w-6 h-6 text-emerald-600" />
            </div>
        </div>
      </nav>

      <main className="relative grow container mx-auto px-6 py-12 space-y-12">
        
        {/* Profile Header Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg">
                <FaRegUserCircle className="w-20 h-20" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white p-2 rounded-xl shadow-lg">
                <FaAward />
            </div>
          </div>
          
          <div className="text-center md:text-left grow">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Alex Johnson</h2>
            <p className="text-emerald-600 font-semibold uppercase tracking-widest text-xs mt-1">Senior Full-Stack Developer</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600 border border-slate-200">BENGALURU, IN</span>
                <span className="px-4 py-1.5 bg-amber-50 rounded-full text-xs font-bold text-amber-700 border border-amber-200">Verified Professional</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <p className="text-2xl font-black text-slate-800">4.9</p>
                <p className="text-[10px] uppercase text-slate-400 font-bold">Trust Score</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <p className="text-2xl font-black text-slate-800">12</p>
                <p className="text-[10px] uppercase text-slate-400 font-bold">Applications</p>
             </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Enrolled Topics Section */}
          <section className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-500 rounded-full" />
                Enrolled Paths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledTopics.map((topic, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-black text-lg text-slate-700 italic">{topic.title}</h4>
                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${topic.progress === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                        {topic.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.progress}%` }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                  <p className="mt-2 text-right text-xs font-bold text-slate-400">{topic.progress}%</p>
                </motion.div>
              ))}
            </div>

            {/* Past Ratings / Reviews Given */}
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 pt-4">
                <span className="w-2 h-6 bg-amber-500 rounded-full" />
                Your Company Feedback
            </h3>
            <div className="space-y-4">
              {pastRatings.map((rate, i) => (
                <div key={i} className="bg-white/50 border border-slate-200 p-5 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-700">{rate.company}</span>
                    <div className="flex text-amber-400 text-xs">
                        {[...Array(5)].map((_, idx) => (
                          <FaStar key={idx} className={idx < rate.rating ? "fill-current" : "text-slate-200"} />
                        ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 italic">"{rate.comment}"</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-tighter">{rate.date}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Companies Section */}
          <aside className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full" />
                Market Interest
            </h3>
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accepted Requests</p>
                <div className="space-y-5">
                    {acceptedCompanies.map((company, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors border border-slate-100">
                                <FaBuilding />
                            </div>
                            <div className="grow">
                                <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{company.name}</h4>
                                <p className="text-[10px] text-slate-500 font-medium uppercase">{company.industry}</p>
                            </div>
                            <FaCheckCircle className="text-emerald-500" />
                        </div>
                    ))}
                </div>
                <button className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                    View All Interactions <FaArrowRight />
                </button>
            </div>
          </aside>

        </div>
      </main>

      <footer className="py-8 border-t border-gray-100 text-center text-sm text-gray-400">
        © 2026 <span className="font-bold text-slate-700">WorkCred</span> Profile Management
      </footer>
    </div>
  );
}