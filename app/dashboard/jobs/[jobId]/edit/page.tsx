"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

type Job = {
  _id: string;
  role: string;
  experience: string;
  requirements: string;
};

export default function EditJobPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    role: "",
    experience: "",
    requirements: "",
  });

  /* =====================
     Fetch job
  ===================== */
  useEffect(() => {
    const fetchJob = async () => {
      try {
      const res = await fetch(`/api/jobs/${jobId}`, {
  credentials: "include",
});

        if (!res.ok) throw new Error("Failed to fetch job");

        const data: Job = await res.json();
        setJob(data);
        setForm({
          role: data.role,
          experience: data.experience,
          requirements: data.requirements,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  /* =====================
     Save edited job
  ===================== */
  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading job…
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] shadow-xl p-8 w-full max-w-xl"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-500 mb-6 hover:text-emerald-600"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-black mb-6">Edit Job</h2>

        <div className="space-y-4">
          <input
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Job Role"
          />

          <input
            value={form.experience}
            onChange={(e) =>
              setForm({ ...form, experience: e.target.value })
            }
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Experience"
          />

          <textarea
            rows={5}
            value={form.requirements}
            onChange={(e) =>
              setForm({ ...form, requirements: e.target.value })
            }
            className="w-full border rounded-xl px-4 py-3 resize-none"
            placeholder="Requirements"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => router.back()}
            className="px-5 py-3 rounded-xl text-slate-500"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
