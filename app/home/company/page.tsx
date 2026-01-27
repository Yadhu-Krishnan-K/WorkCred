"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaRegUserCircle, FaCheckCircle } from "react-icons/fa";

/* ---------------- TYPES (MATCH DB SCHEMA) ---------------- */

type Candidate = {
  _id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
};

/* ---------------- PAGE ---------------- */

export default function CompanyHome() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const res = await fetch("/api/candidates");

        if (!res.ok) {
          throw new Error("Failed to fetch candidates");
        }

        const json = await res.json();
        setCandidates(json.data);
        setSelected(json.data[0] ?? null);
      } catch (error) {
        console.error("Failed to load candidates", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading candidates...
      </div>
    );
  }

  if (!candidates.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No candidates found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: Candidate List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-5
            ${showDetails ? "hidden lg:block" : "block"}
          `}
        >
          <h2 className="text-lg font-semibold mb-4">Candidates</h2>

          <div className="space-y-4">
            {candidates.map((candidate) => (
              <motion.div
                key={candidate._id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelected(candidate);
                  setShowDetails(true);
                }}
                className={`cursor-pointer p-4 rounded-xl border transition
                  ${
                    selected?._id === candidate._id
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-300"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaRegUserCircle className="text-emerald-500 text-xl" />
                  <div>
                    <p className="font-medium">{candidate.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {candidate.email}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Candidate Details */}
        <motion.div
          className={`bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6
            ${showDetails ? "block" : "hidden"}
            lg:block lg:col-span-2`}
        >
          {selected && (
            <CandidateDetails
              candidate={selected}
              onBack={() => setShowDetails(false)}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- DETAILS COMPONENT ---------------- */

function CandidateDetails({
  candidate,
  onBack,
}: {
  candidate: Candidate;
  onBack: () => void;
}) {
  return (
    <>
      {/* Mobile Back */}
      <button
        onClick={onBack}
        className="mb-4 text-sm text-emerald-600 lg:hidden"
      >
        ← Back to candidates
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="w-32 h-32">
            <FaRegUserCircle className="w-full h-full text-emerald-500" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">
            {candidate.fullName}
          </h2>
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span>{" "}
            {candidate.email}
          </p>

          <p className="flex items-center gap-2">
            <span className="font-semibold">Verified:</span>
            {candidate.isVerified ? (
              <span className="flex items-center gap-1 text-emerald-600">
                <FaCheckCircle /> Yes
              </span>
            ) : (
              <span className="text-red-500">No</span>
            )}
          </p>

          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(candidate.createdAt).toDateString()}
          </p>
        </div>
      </div>
    </>
  );
}
