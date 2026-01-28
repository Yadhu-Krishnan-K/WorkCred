"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaAward,
  FaArrowRight,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

/* =====================
   Type (MATCH BACKEND)
===================== */

type Company = {
  _id: string;
  companyName: string;
  email: string;
  companyType: string;
  isVerified: boolean;
  createdAt: string;
  profileImageUrl?: string;
  profileImagePublicId?: string;
  description?: string;
  website?: string;
  city?: string;
};

export default function CompanyProfile() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  /* Edit modal state */
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    companyType: "",
    description: "",
    website: "",
    city: "",
  });

  /* =====================
     Fetch company
  ===================== */

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch("/api/profile/company", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch company");

        const data: Company = await res.json();
        setCompany(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  /* Sync edit form */
  useEffect(() => {
    if (company) {
      setForm({
        companyName: company.companyName,
        companyType: company.companyType,
        description: company.description || "",
        website: company.website || "",
        city: company.city || "",
      });
    }
  }, [company]);

  /* =====================
     Upload handler
  ===================== */

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload/company-profile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      setCompany((prev) =>
        prev ? { ...prev, profileImageUrl: data.imageUrl } : prev
      );

      setFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  /* =====================
     Save profile edits
  ===================== */

  const handleSaveProfile = async () => {
    try {
      const res = await fetch("/api/profile/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setCompany(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  /* =====================
     Loading states
  ===================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading company profile…
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Company not found
      </div>
    );
  }

  /* =====================
     UI
  ===================== */

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900">

      {/* Background */}
      <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-emerald-100/40 blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-amber-100/40 blur-[100px]" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-black bg-gradient-to-r from-amber-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
          WorkCred
        </h1>
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
          <FaBuilding className="w-5 h-5 text-emerald-600" />
        </div>
      </nav>

      <main className="relative grow container mx-auto px-6 py-12 space-y-10">

        {/* =====================
            PROFILE HEADER
        ===================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-8"
        >
          {/* Edit icon */}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-6 right-6 text-slate-400 hover:text-emerald-600 transition"
          >
            <FaEdit />
          </button>

          {/* DP */}
          <div className="relative w-32 h-32">
            <div className="relative w-full h-full rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg overflow-hidden">
              {company.profileImageUrl ? (
                <Image
                  src={company.profileImageUrl}
                  alt="Company Profile"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              ) : (
                <FaBuilding className="w-16 h-16" />
              )}

              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>

            <input
              id="companyProfileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <label
              htmlFor="companyProfileUpload"
              className="absolute -bottom-2 -left-2 bg-white text-gray-700 p-2 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition"
            >
              📷
            </label>

            {file && !uploading && (
              <button
                onClick={handleUpload}
                className="absolute -bottom-2 -right-2 bg-amber-400 text-white p-2 rounded-xl shadow-lg hover:bg-amber-500 transition"
              >
                Upload
              </button>
            )}

            <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-2 rounded-xl shadow-lg">
              <FaAward />
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left grow">
            <h2 className="text-3xl font-black">{company.companyName}</h2>

            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mt-1">
              {company.companyType} COMPANY
            </p>

            <p className="mt-3 text-sm text-slate-500 max-w-md">
              {company.description || "No description added yet."}
            </p>

            {/* ✅ CITY ADDED (ONLY NEW LINE) */}
            <p className="mt-2 text-xs font-bold uppercase text-slate-400 tracking-widest">
              {company.city || "City not specified"}
            </p>
          </div>
        </motion.section>

        {/* =====================
            STATUS CARD
        ===================== */}
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
            <span className="w-2 h-6 bg-emerald-500 rounded-full" />
            Company Status
          </h3>

          <motion.div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl">
            <p className="text-[10px] text-emerald-400 uppercase font-black">
              Account Status
            </p>
            <h4 className="text-4xl font-black italic mt-1">
              Active Employer
            </h4>
            <p className="text-slate-400 mt-2">
              Member since{" "}
              {new Date(company.createdAt).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </motion.div>
        </div>

        {/* =====================
            DASHBOARD BUTTON
        ===================== */}
        <div className="max-w-sm">
          <button className="w-full py-4 rounded-2xl bg-emerald-600 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2">
            Open Dashboard <FaArrowRight />
          </button>
        </div>
      </main>

      {/* =====================
          EDIT MODAL
      ===================== */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-[2rem] w-full max-w-xl p-8 shadow-2xl relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <FaTimes />
            </button>

            <h3 className="text-2xl font-black mb-6">
              Edit Company Profile
            </h3>

            <div className="space-y-4">
              <input
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Company Name"
              />

              <select
                value={form.companyType}
                onChange={(e) =>
                  setForm({ ...form, companyType: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="IT">IT</option>
                <option value="MEDICAL">Medical</option>
                <option value="AUTOMOBILE">Automobile</option>
                <option value="AGRICULTURE">Agriculture</option>
                <option value="OTHERS">Others</option>
              </select>

              <input
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3"
                placeholder="City"
              />

              <input
                value={form.website}
                onChange={(e) =>
                  setForm({ ...form, website: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Website"
              />

              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 resize-none"
                placeholder="Description"
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-3 rounded-xl text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-10 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          © 2026 <span className="font-bold">WorkCred</span>
        </p>
      </footer>
    </div>
  );
}
