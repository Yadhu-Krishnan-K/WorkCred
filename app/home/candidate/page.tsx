"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/candidate";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const categories = [
  { title: "IT", desc: "Software, Cloud & AI solutions." },
  { title: "MEDICAL", desc: "Healthcare & Biotech breakthroughs." },
  { title: "AUTO-MOBILE", desc: "Next-gen mobility & engineering." },
  { title: "COMMERCE", desc: "Trade, Finance & Digital markets." },
  { title: "AGRICULTURE", desc: "Sustainable farming & AgriTech." },
  { title: "GEOLOGICAL", desc: "Earth sciences & Resource mapping." },
];

export default function CandidateHome() {
  // ✅ Stripe Enroll Logic
  const handleEnroll = async (category: string) => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden bg-slate-50">

        {/* Background glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-200/40 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/30 blur-[120px]" />

        {/* Main */}
        <main className="relative container mx-auto px-6 py-20">
          <header className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-slate-900"
            >
              Explore Your <span className="text-emerald-600">Future</span>
            </motion.h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">
              Select a domain to unlock verified opportunities.
            </p>
          </header>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow border border-white hover:border-emerald-200 transition-all"
              >
                <h3 className="text-2xl font-bold text-slate-800 uppercase italic">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-500">
                  {item.desc}
                </p>

                {/* Stripe Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleEnroll(item.title)}
                  className="mt-8 w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-200"
                >
                  <span>Enroll Now</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">₹10</span>
                    <FaArrowRight />
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
