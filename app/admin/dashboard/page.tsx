"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LockIcon,
  LockOpenIcon,
  ShieldCheck,
  ShieldBan,
  Bell,
  Menu, // Added for mobile menu toggle if needed
} from "lucide-react";
import { Sidebar } from "@/components/admin/Sidebar";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { signOut } from "next-auth/react";
type Candidate = {
  _id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  isBlocked: boolean;
}

type Company = {
  _id: string;
  companyName: string;
  email: string;
  isVerified: boolean;
  isBlocked: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [companies, setCompanies] = useState<Company[]>([])

  //mock data
  const growthData = [
    { name: 'Jan', users: 400, revenue: 2400 },
    { name: 'Feb', users: 700, revenue: 3600 },
    { name: 'Mar', users: 1200, revenue: 5200 },
    { name: 'Apr', users: 1500, revenue: 7800 },
  ];


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
  const blockOrUnblockItem = async (id: string) => {
    const type = activeTab === "users" ? "candidate" : "company"

    await fetch("/api/admin/toggle-block", {
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

  const renderOverview = () => (
    <div className="space-y-6 md:space-y-10">
      {/* Stat Grid - 1 col on mobile, 3 on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard title="Total Candidates" value={candidates.length} growth="+12%" />
        <StatCard title="Total Companies" value={companies.length} growth="+5%" />
        <StatCard title="Total Revenue" value="$42,500" growth="+18%" isCurrency />
      </div>

      {/* Charts Section - Stacked on mobile/tablet, Side-by-side on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white/5 border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] backdrop-blur-md">
          <h3 className="text-white font-bold mb-6 text-sm md:text-base">User Growth</h3>
          <div className="h-64 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <Tooltip
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="users" stroke="#f59e0b" fillOpacity={0.2} fill="#f59e0b" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] backdrop-blur-md">
          <h3 className="text-white font-bold mb-6 text-sm md:text-base">Verification Status</h3>
          <div className="flex items-center justify-around h-auto md:h-80">
            <div className="space-y-6 w-full px-2">
              <ProgressItem label="Verified Users" current={candidates.filter(c => c.isVerified).length} total={candidates.length} color="bg-amber-500" />
              <ProgressItem label="Verified Companies" current={companies.filter(c => c.isVerified).length} total={companies.length} color="bg-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] text-gray-300 selection:bg-amber-500/30 ">

      {/* 1. Sidebar - Ensure your Sidebar component handles mobile (e.g., a burger menu or bottom nav) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => signOut({ callbackUrl: "/admin/login" })}
      />

      {/* 2. Main Content Area */}
      <main className="grow p-4 md:p-10 max-w-7xl mx-auto w-full mb-20 md:mb-0">

        {/* Top Utility Bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 md:mb-12">
          {activeTab !== "overview" && (
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 outline-none focus:ring-2 focus:ring-amber-500/20 w-full text-sm text-white"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-6 ml-auto md:ml-0">
            <button className="relative text-gray-400 hover:text-white">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-[#050505]" />
            </button>
          </div>
        </div>

        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight capitalize">{activeTab}</h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">Managing the pulse of the ecosystem.</p>
        </div>

        {/* 3. The Glass Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            {activeTab === "overview" ? renderOverview() : (
              <div className="relative overflow-hidden bg-white/2 border border-white/10 rounded-2xl md:rounded-[2.5rem]">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-white/3 text-gray-500 uppercase text-[11px] tracking-[0.2em] font-black">
                      <tr>
                        <th className="px-10 py-6">Identity</th>
                        <th className="px-10 py-6">Verification</th>
                        <th className="px-10 py-6 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(activeTab === "users" ? candidates : companies).map(
                        (item: Candidate | Company, index) => (
                          <tr key={item._id} className="group hover:bg-white/2 transition-colors">

                            <td className="px-10 py-7">
                              <div className="flex items-center gap-5">

                                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-amber-500 font-bold">
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
                                  icon={item.isVerified ? <ShieldCheck size={18} /> : <ShieldBan size={18} />}
                                  label={item.isVerified ? "verified" : "unverified"}
                                  color={`${item.isVerified ? 'hover:text-emerald-400 hover:bg-emerald-500/10' : "hover:text-red-400 hover:bg-red-500/10"}`}
                                  onClick={() => verifyEntity(item._id)}
                                />

                                <ActionButton
                                  icon={item.isBlocked ? <LockIcon size={18} /> : <LockOpenIcon size={18} />}
                                  label={`${item.isBlocked ? "blocked" : "not blokced"}`}
                                  color={`${item.isBlocked ? "hover:text-red-400 hover:bg-red-500/10" : "hover:text-emerald-400 hover:bg-emerald-500/10"}`}
                                  onClick={() => blockOrUnblockItem(item._id)}
                                />

                              </div>
                            </td>

                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile List View (Cards) */}
                <div className="md:hidden divide-y divide-white/5">
                  {(activeTab === "users" ? candidates : companies).map((item) => (
                    <div key={item._id} className="p-5 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-800 border border-white/10 flex items-center justify-center text-amber-500 font-bold">
                          {"fullName" in item ? item.fullName.charAt(0) : item.companyName.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-white font-bold truncate">{"fullName" in item ? item.fullName : item.companyName}</p>
                          <p className="text-[10px] text-gray-500 font-mono truncate">{item.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.isVerified ? 'bg-amber-500' : 'bg-gray-700'}`} />
                          <span className="text-[10px] font-bold uppercase">{item.isVerified ? 'Verified' : 'Pending'}</span>
                        </div>
                        <div className="flex gap-2">
                          <ActionButton
                            icon={item.isVerified ? <ShieldCheck size={16} /> : <ShieldBan size={16} />}
                            label="Verify"
                            color={item.isVerified ? 'text-emerald-400 bg-emerald-500/10' : "text-red-400 bg-red-500/10"}
                            onClick={() => verifyEntity(item._id)}
                          />
                          <ActionButton
                            icon={item.isBlocked ? <LockIcon size={16} /> : <LockOpenIcon size={16} />}
                            label="Block"
                            color={item.isBlocked ? "text-red-400 bg-red-500/10" : "text-emerald-400 bg-emerald-500/10"}
                            onClick={() => blockOrUnblockItem(item._id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
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

// --- New Sub-Components ---

function StatCard({ title, value, growth }: any) {
  return (
    <div className="p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-white/2 border border-white/10">
      <p className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">{title}</p>
      <div className="flex items-end justify-between mt-2 md:mt-4">
        <h2 className="text-2xl md:text-4xl font-black text-white">{value}</h2>
        <span className="text-emerald-500 font-mono text-xs mb-1">{growth}</span>
      </div>
    </div>
  );
}

function ProgressItem({ label, current, total, color }: any) {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
        <span>{label}</span>
        <span className="text-gray-500">{current} / {total}</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}