"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Trash2,
  LockIcon,
  LockOpenIcon,
  ShieldCheck,
  ShieldBan,
  Bell,
} from "lucide-react";
import { Sidebar } from "@/components/admin/Sidebar";
import { fetchData } from "next-auth/client/_utils";

type Candidate = {
  _id: string
  fullName: string
  email: string
  isVerified: boolean
}

type Company = {
  _id: string
  companyName: string
  email: string
  isVerified: boolean
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [companies, setCompanies] = useState<Company[]>([])

  // fetching uses&companies
  const fetchData = useCallback(async () => {
    const [candidateRes, companyRes] = await Promise.all([
      fetch("/api/candidates"),
      fetch("/api/getCompany/companies")
    ])

    const candidatesRes = await candidateRes.json()
    const companiesRes = await companyRes.json()

    const candidatesData = candidatesRes.data
    const companiesData = companiesRes.companies
    setCandidates(candidatesData)
    setCompanies(companiesData)

  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // --- Logic Placeholders ---
  const verifyEntity = async (id: string) => {
    const type = activeTab === "users" ? "candidate" : "company"

    await fetch("/api/admin/verify", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        type
      })
    })

    fetchData()
  }
  const blockOrUnblockItem = (id: string) => console.log("Action: Delete", id);
  // const verifyEntity = (id: string) => console.log("Action: Verify", id);

  return (
    <div className="flex min-h-screen bg-[#050505] text-gray-300 selection:bg-amber-500/30">

      {/* 1. Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Content Area */}
      <main className="flex-grow p-10 max-w-7xl mx-auto w-full">

        {/* Top Utility Bar */}
        <div className="flex justify-between items-center mb-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="text"
              placeholder="Search database..."
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all w-80 text-sm text-white"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border-2 border-[#050505]" />
            </button>

          </div>
        </div>

        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight capitalize">{activeTab}</h1>
          <p className="text-gray-500 mt-2">Managing the pulse of the WorkCred ecosystem.</p>
        </div>

        {/* 3. The Glass Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-white/[0.02] border border-white/10 rounded-[2.5rem] shadow-2xl backdrop-blur-md"
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.03] text-gray-500 uppercase text-[11px] tracking-[0.2em] font-black">
              <tr>
                <th className="px-10 py-6">Identity</th>
                <th className="px-10 py-6">Verification</th>
                <th className="px-10 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(activeTab === "users" ? candidates : companies).map(
                (item: Candidate | Company, index) => (
                  <tr key={item._id} className="group hover:bg-white/[0.02] transition-colors">

                    <td className="px-10 py-7">
                      <div className="flex items-center gap-5">

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-amber-500 font-bold">
                          {"fullName" in item
                            ? item.fullName.charAt(0)
                            : item.companyName.charAt(0)}
                        </div>

                        <div>
                          <p className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors">
                            {"fullName" in item
                              ? item.fullName
                              : item.companyName}
                          </p>

                          <p className="text-xs text-gray-500 font-mono">
                            {item.email}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-10 py-7">
                      <div className="flex items-center gap-2">

                        <div className={`w-2 h-2 rounded-full ${item.isVerified ? 'bg-amber-500 animate-pulse' : 'bg-gray-700'
                          }`} />

                        <span className={`text-xs font-bold ${item.isVerified ? 'text-amber-500' : 'text-gray-500'
                          }`}>
                          {item.isVerified ? 'VERIFIED' : 'PENDING'}
                        </span>

                      </div>
                    </td>

                    <td className="px-10 py-7">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">

                        <ActionButton
                          icon={item.isVerified?<ShieldCheck size={18} />:<ShieldBan size={18} />}
                          label={item.isVerified?"verified":"unverified"}
                          color={`${item.isVerified?'hover:text-emerald-400 hover:bg-emerald-500/10':"hover:text-red-400 hover:bg-red-500/10"}`}
                          onClick={() => verifyEntity(item._id)}
                        />

                        {/* <ActionButton
                          icon={<Edit3 size={18} />}
                          label="Edit"
                          color="hover:text-blue-400 hover:bg-blue-500/10"
                          onClick={() => editItem(item._id)}
                        /> */}

                        <ActionButton
                          icon={<Trash2 size={18} />}
                          label="Delete"
                          color="hover:text-red-400 hover:bg-red-500/10"
                          onClick={() => blockOrUnblockItem(item._id)}
                        />

                      </div>
                    </td>

                  </tr>
                ))}
            </tbody>
          </table>
        </motion.div>
      </main>

    </div>
  );
}

// --- Sub-Components ---



function ActionButton({ icon, label, color, onClick }: { icon: any, label: string, color: string, onClick: any }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 transition-all duration-300 backdrop-blur-md ${color} hover:border-current active:scale-90`}
    >
      {icon}
    </button>
  );
}