"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUserCircle, FaUserTie } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";


type Candidate = {
  id: number;
  name: string;
  role: string;
  experience: string;
  rating: string;
  skills: string[];
  description: string;
};

const candidates: Candidate[] = [
  {
    id: 1,
    name: "Amit Sharma",
    role: "Frontend Developer",
    experience: "2 Years",
    rating: "4.6",
    skills: ["React", "Next.js", "Tailwind"],
    description:
      "Experienced frontend developer with strong UI skills and production-ready React experience.",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Backend Engineer",
    experience: "3 Years",
    rating: "4.8",
    skills: ["Node.js", "MongoDB", "Express"],
    description:
      "Backend-focused engineer skilled in scalable APIs and authentication systems.",
  },
  
];

export default function CompanyHome() {
  const router = useRouter();
  const [selected, setSelected] = useState<Candidate>(candidates[0]);

  const handleSelect = (candidate: Candidate) => {
    // Mobile → navigate
    if (window.innerWidth < 1024) {
      router.push(`/company/candidate/${candidate.id}`);
      return;
    }

    // Desktop → inline view
    setSelected(candidate);
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-extrabold bg-linear-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
          WorkCred
          </h1>
          <div className="flex justify-between items-center w-48 h-auto">
            <div className="w-8 h-8">
                <MdNotificationsActive className="w-full h-full text-amber-500 cursor-pointer" />
            </div>
            <div className="w-8 h-8">
                <FaRegUserCircle className="w-full h-full text-amber-500 cursor-pointer" />
            </div>
          </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-screen">

        {/* LEFT: Candidate List (Always visible) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-5"
        >
          <h2 className="text-lg font-semibold mb-4">Candidates</h2>

          <div className="space-y-4">
            {candidates.map((candidate) => (
              <motion.div
                key={candidate.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSelect(candidate)}
                className={`cursor-pointer p-4 rounded-xl border transition
                  ${
                    selected.id === candidate.id
                      ? "border-amber-400 bg-amber-50"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaUserTie className="text-amber-500 text-xl" />
                  <div>
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-sm text-gray-500">
                      {candidate.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Candidate Details (DESKTOP ONLY) */}
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:block lg:col-span-2 bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6"
        >
          <CandidateDetails candidate={selected} />
        </motion.div>
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

/* ----------------- Reusable Details Component ----------------- */

function CandidateDetails({ candidate }: { candidate: Candidate }) {
  return (
    <div className="flex">
        <div className="w-1/3 h-auto flex flex-col justify-center">
            <div className="w-32 h-32">
                <FaRegUserCircle className="w-full h-full text-blue-500 cursor-pointer" />
            </div>
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
        </div>
        <div className="w-2/3 h-auto">
            
            <p className="text-xl font-semibold">{candidate.role}</p>

            <div className="mt-4 flex gap-8 text-sm">
                <p>
                <span className="text-gray-500">Experience:</span>{" "}
                {candidate.experience}
                </p>
                <p className="text-amber-500">
                ⭐ {candidate.rating}
                </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-sm"
                >
                    {skill}
                </span>
                ))}
            </div>

            <p className="mt-6 text-gray-600 text-sm leading-relaxed">
                {candidate.description}
            </p>

            <button className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Accept
            </button>
            <button className="mt-8 ms-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Decline
            </button>
        </div>
    </div>
  );
}
