"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Building2, Settings, LogOut } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 relative group ${
      active ? "text-amber-500" : "text-gray-500 hover:text-gray-200"
    }`}
  >
    {active && (
      <motion.div 
        layoutId="nav-bg"
        className="absolute inset-0 bg-amber-500/10 border border-amber-500/20 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.05)]"
      />
    )}
    <span className={`relative z-10 ${active ? "drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" : ""}`}>
      {icon}
    </span>
    <span className="relative z-10 font-bold text-sm tracking-tight">{label}</span>
  </button>
);

export const Sidebar = ({ activeTab, setActiveTab, onLogout }: any) => {
  return (
    <aside className="w-72 border-r border-white/5 bg-white/[0.01] backdrop-blur-2xl p-6 flex flex-col sticky top-0 h-screen">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 shadow-[0_0_15px_rgba(245,158,11,0.4)]" />
        <h2 className="text-xl font-black bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tighter">
          WORKCRED
        </h2>
      </div>

      <nav className="flex-grow space-y-1.5">
        <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
        <NavItem icon={<Users size={20} />} label="Manage Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
        <NavItem icon={<Building2 size={20} />} label="Companies" active={activeTab === 'companies'} onClick={() => setActiveTab('companies')} />
        {/* <NavItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} /> */}
      </nav>

      <button onClick={onLogout} className="mt-auto flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 transition-all group">
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
};