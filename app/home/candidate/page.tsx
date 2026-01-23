"use client";

import { motion } from "framer-motion";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function CandidateHome() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-extrabold bg-linear-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
          WorkCred
        </h1>

        <div className="w-8 h-8">
          <FaRegUserCircle className="w-full h-full text-amber-500 cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grow">
        <div className="px-6 md:px-10 py-16">

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "IT",
              "MEDICAL",
              "AUTO-MOBILE",
              "COMMERCE",
              "AGRICULTURE",
              "GEOLOGICAL",
            ].map((title, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6 flex flex-col justify-between"
              >

                {/* Topic */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Explore verified jobs, freelancers, and trusted companies
                    in this domain.
                  </p>
                </div>

                {/* ₹10 Enroll Box */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6"
                >
                  <button
                    className="w-full flex items-center justify-between 
                         px-5 py-3 rounded-xl 
                         bg-amber-100 text-amber-600 font-semibold
                         ring-1 ring-amber-300
                         hover:bg-amber-200 transition"
                  >
                    <span>Enroll</span>
                    <span className="text-lg">₹10</span>
                  </button>
                </motion.div>

              </motion.div>
            ))}

          </div>
        </div>
      </div>


      {/* Footer (ALWAYS at bottom) */}
      <footer className="flex items-center justify-center px-6 py-4">
        <p className="text-sm text-gray-500">
          © 2026{" "}
          <span className="font-semibold bg-linear-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            WorkCred
          </span>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}