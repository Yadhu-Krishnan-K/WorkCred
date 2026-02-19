"use client";

import { motion } from "framer-motion";

export default function SuccessUI() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        >
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-3xl font-extrabold text-gray-900"
        >
          Payment Successful 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-gray-600"
        >
          Thank you for your purchase. Your payment has been processed
          successfully.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8 }}
          className="my-6 h-px bg-gray-200 origin-left"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-xl bg-green-600 px-6 py-3 text-white font-semibold
                     hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
          onClick={() => (window.location.href = "/home/candidate")}
        >
          Go to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}
