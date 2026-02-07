"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <h1
          className="text-2xl font-black bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 bg-clip-text text-transparent cursor-pointer tracking-tight"
          onClick={() => router.push('/')}
        >
          WorkCred
        </h1>

        <div className="flex items-center gap-8">
          {/* Custom Dropdown for Sign In */}
          <div
            className="relative group"
            onMouseEnter={() => setIsLoginOpen(true)}
            onMouseLeave={() => setIsLoginOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 group-hover:text-amber-600 transition-colors py-2">
              Sign In
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isLoginOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mesmerizing Dropdown Menu */}
            <AnimatePresence>
              {isLoginOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-1 w-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden p-2"
                >
                  <button
                    onClick={() => router.push('/login/candidate')}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all flex items-center gap-3"
                  >
                    <div className="p-1.5 bg-amber-100 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    As Candidate
                  </button>

                  <button
                    onClick={() => router.push('/login/company')}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all flex items-center gap-3"
                  >
                    <div className="p-1.5 bg-orange-100 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10V11a1 1 0 011-1h2a1 1 0 011 1v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    As Company
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Join Button */}
          <button
            onClick={() => router.push('/join')}
            className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/20 active:scale-95"
          >
            JOIN CRED
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center px-10 py-16 gap-10">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold leading-tight">
              Discover the <span className="text-amber-500">Best Companies</span>,
              Trusted Employees & Freelancers
            </h1>

            <p className="mt-4 text-gray-600">
              WorkCred is a trusted platform for company reviews, employee ratings,
              and freelancing credibility — all in one place.
            </p>

            {/* ⭐ Rating Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="mt-6 mb-6 inline-flex items-center gap-4 px-5 py-3 rounded-xl 
                         bg-white/80 backdrop-blur 
                         shadow-md ring-1 ring-amber-200"
            >
              <div className="flex text-amber-500 text-xl">
                ★ ★ ★ ★ ★
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-800">
                  5.0 Rating
                </span>
                <span className="text-xs text-gray-500">
                  Trusted by stars
                </span>
              </div>
            </motion.div>

            {/* CTA */}
            <button
              onClick={() => router.push("/join")}
              className="px-6 py-3 ml-6 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition"
            >
              Join WorkCred
            </button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="/hero.png"
              alt="Career Growth"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-center px-6 py-4">
        <p className="text-sm text-gray-500">
          © 2026{" "}
          <span className="font-semibold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            WorkCred
          </span>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}
