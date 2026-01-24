"use client";

import { motion } from "framer-motion";
import { FaRegUserCircle, FaArrowRight } from "react-icons/fa";

const categories = [
  { title: "IT", desc: "Software, Cloud & AI solutions." },
  { title: "MEDICAL", desc: "Healthcare & Biotech breakthroughs." },
  { title: "AUTO-MOBILE", desc: "Next-gen mobility & engineering." },
  { title: "COMMERCE", desc: "Trade, Finance & Digital markets." },
  { title: "AGRICULTURE", desc: "Sustainable farming & AgriTech." },
  { title: "GEOLOGICAL", desc: "Earth sciences & Resource mapping." },
];

export default function CandidateHome() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50">
      
      {/* Mesmerizing Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-200/40 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/30 blur-[120px]" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 flex items-center justify-between px-8 py-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black bg-gradient-to-r from-amber-500 via-orange-600 to-red-500 bg-clip-text text-transparent"
        >
          WorkCred
        </motion.h1>

        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-amber-50 shadow-sm border border-amber-200 cursor-pointer"
        >
          <FaRegUserCircle className="w-6 h-6 text-amber-600" />
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="relative grow container mx-auto px-6 py-20">
        <header className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Explore Your <span className="text-emerald-600">Future</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="mt-4 text-gray-500 max-w-lg mx-auto"
          >
            Select a domain to discover premium opportunities tailored to your expertise.
          </motion.p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-emerald-200 transition-all"
            >
              {/* Card Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 mt-1 uppercase italic">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-500 leading-relaxed">
                  {item.desc}
                </p>

                {/* Green Enroll Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full group/btn flex items-center justify-between px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-200 transition-all"
                >
                  <span className="flex flex-col items-start">
                    <span className="text-[10px] uppercase opacity-80 font-medium tracking-tighter">Get Started</span>
                    <span>Enroll Now</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">₹10</span>
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </div>

              {/* Decorative background glow on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/0 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-gray-100 bg-white/50 backdrop-blur-md">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            © 2026 <span className="font-bold text-slate-700">WorkCred</span>. Crafted for Excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}