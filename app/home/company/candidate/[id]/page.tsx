"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect } from "react";


const candidates = [
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

export default function CandidateDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1024) {
        router.replace("/Company");
        }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [router]);


  const candidate = candidates.find(
    (c) => c.id === Number(id)
  );

  if (!candidate) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen px-6 py-8 bg-white"
    >
      <button
        onClick={() => router.back()}
        className="mb-6 text-amber-500 font-medium"
      >
        ← Back
      </button>
      <div className="w-32 h-32">
        <FaRegUserCircle className="w-full h-full text-blue-500 cursor-pointer" />
      </div>
      <h1 className="text-2xl font-semibold">{candidate.name}</h1>
      <p className="text-sm text-gray-500">{candidate.role}</p>

      <div className="mt-4 flex gap-6 text-sm">
        <p>{candidate.experience}</p>
        <p className="text-amber-500">⭐ {candidate.rating}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-sm"
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
    </motion.div>
  );
}
