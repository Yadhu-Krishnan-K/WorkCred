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

export default function CandidateUI() {
  const handleEnroll = async (category: string) => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });

    const data = await res.json();

    if (data.url) {
      console.log('this is the stripe page url....')
      window.location.href = data.url;
    }
  };

  return (
    <>
      <Navbar />
      {/* Background changed to gray-50 to match login */}
      <div className="relative min-h-screen overflow-hidden bg-gray-50">
        <main className="relative container mx-auto px-6 py-20">
          <header className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // {/* Text slate-900 to match login header */}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Explore Your <span className="text-blue-500">Future</span>
            </motion.h2>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto">
              Select a domain to unlock verified opportunities.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                // {/* rounded-xl and shadow-md to match login card */}
                className="group bg-white rounded-xl p-8 shadow-md border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-500">{item.desc}</p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleEnroll(item.title)}
                  // {/* Changed emerald-600 to blue-500 and rounded-2xl to rounded-lg */}
                  className="mt-8 w-full flex items-center justify-between px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                >
                  <span>Enroll Now</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">₹10</span>
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