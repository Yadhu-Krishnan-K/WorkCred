
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar/company"; // ✅ USING YOUR NAVBAR
import {
  FaBuilding,
  FaAward,
  FaArrowRight,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

/* =====================
   Type
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
  const router = useRouter();

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    companyType: "",
    description: "",
    website: "",
    city: "",
  });

  /* ===================== FETCH ===================== */

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch("/api/profile/company", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch");

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

  /* Sync form */

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

  /* ===================== UPLOAD ===================== */

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

  /* ===================== SAVE ===================== */

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

  /* ===================== LOADING ===================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading company profile...
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

  /* ===================== UI ===================== */

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">

      {/* ✅ NAVBAR */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">

        {/* PROFILE CARD */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur rounded-3xl border border-emerald-100 shadow-xl p-8 flex flex-col md:flex-row gap-10 items-center relative"
        >

          {/* EDIT */}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute right-6 top-6 text-slate-400 hover:text-emerald-600"
          >
            <FaEdit />
          </button>

          {/* IMAGE */}
          <div className="relative w-32 h-32 rounded-[2rem] overflow-hidden bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white shadow-lg">

            {company.profileImageUrl ? (
              <Image
                src={company.profileImageUrl}
                alt="company"
                fill
                className="object-cover"
              />
            ) : (
              <FaBuilding size={50} />
            )}

            {uploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <input
              id="companyProfileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <label
              htmlFor="companyProfileUpload"
              className="absolute -bottom-2 -left-2 bg-white p-2 rounded-xl shadow cursor-pointer"
            >
              📷
            </label>

            {file && !uploading && (
              <button
                onClick={handleUpload}
                className="absolute -bottom-2 -right-2 bg-amber-500 text-white px-2 py-1 rounded-xl text-xs shadow"
              >
                Upload
              </button>
            )}

            <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-2 rounded-xl shadow">
              <FaAward />
            </div>

          </div>

          {/* INFO */}
          <div className="flex-1">

            <h2 className="text-4xl font-black text-slate-900">
              {company.companyName}
            </h2>

            <p className="text-xs uppercase font-bold tracking-widest text-emerald-600 mt-1">
              {company.companyType} Company
            </p>

            <p className="mt-4 text-slate-500 max-w-xl text-sm leading-relaxed">
              {company.description || "No description added yet."}
            </p>

            <div className="grid grid-cols-2 gap-6 mt-6 text-sm">

              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                <p className="font-semibold">{company.email}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">City</p>
                <p className="font-semibold">{company.city || "Not specified"}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Website</p>
                <p className="font-semibold">{company.website || "Not added"}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Member Since</p>
                <p className="font-semibold">
                  {new Date(company.createdAt).toLocaleDateString()}
                </p>
              </div>

            </div>

          </div>

        </motion.section>

        {/* STATUS + ACTION */}
        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl">

            <p className="text-xs uppercase text-emerald-400 font-bold">
              Account Status
            </p>

            <h3 className="text-3xl font-black mt-2">
              Active Employer
            </h3>

            <p className="text-slate-400 mt-2">
              Verified company on WorkCred
            </p>

          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-3xl p-8 flex items-center justify-center gap-3 font-black shadow-lg hover:scale-105 transition"
          >
            Open Dashboard <FaArrowRight />
          </button>

        </div>

      </main>

      {/* MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white/80 backdrop-blur rounded-3xl w-full max-w-xl p-8 relative shadow-xl">

            <button
              onClick={() => setIsEditing(false)}
              className="absolute right-5 top-5 text-gray-400"
            >
              <FaTimes />
            </button>

            <h3 className="text-2xl font-black mb-6">
              Edit Company Profile
            </h3>

            <div className="space-y-4">

              <input className="w-full border rounded-xl px-4 py-3" value={form.companyName} onChange={(e)=>setForm({...form,companyName:e.target.value})} />
              <select className="w-full border rounded-xl px-4 py-3" value={form.companyType} onChange={(e)=>setForm({...form,companyType:e.target.value})}>
                <option value="IT">IT</option>
                <option value="MEDICAL">Medical</option>
                <option value="AUTOMOBILE">Automobile</option>
                <option value="AGRICULTURE">Agriculture</option>
                <option value="OTHERS">Others</option>
              </select>
              <input className="w-full border rounded-xl px-4 py-3" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} />
              <input className="w-full border rounded-xl px-4 py-3" value={form.website} onChange={(e)=>setForm({...form,website:e.target.value})} />
              <textarea rows={4} className="w-full border rounded-xl px-4 py-3" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button onClick={()=>setIsEditing(false)} className="px-5 py-3 text-slate-500">
                Cancel
              </button>

              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-xl font-bold shadow hover:scale-105 transition"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}