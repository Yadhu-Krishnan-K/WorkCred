"use client";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Building2, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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
        className="absolute inset-0 bg-amber-500/10 border border-amber-500/20 rounded-2xl"
      />
    )}
    <span className="relative z-10">{icon}</span>
    <span className="relative z-10 font-bold text-sm">{label}</span>
  </button>
);

export const Sidebar = ({ activeTab, setActiveTab, onLogout }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile sidebar when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* 🔹 Mobile Header (Sticky) */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-white/10 w-full">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 to-orange-600" />
           <h2 className="text-lg font-bold text-amber-400">WORKCRED</h2>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <Menu size={24} className="text-gray-400" />
        </button>
      </div>

      {/* 🔹 Sidebar Container */}
      <div className="relative">
        {/* Desktop Sidebar (Always Visible) */}
        <aside className="hidden lg:flex sticky top-0 h-screen w-72 bg-black border-r border-white/10 p-6 flex-col">
          <SidebarContent activeTab={activeTab} onSelect={handleTabChange} onLogout={onLogout} />
        </aside>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
              />

              {/* Sidebar Panel */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 z-[70] w-72 bg-black border-r border-white/10 p-6 flex flex-col lg:hidden"
              >
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-bold text-amber-400">WORKCRED</h2>
                  <button onClick={() => setIsOpen(false)} className="p-2">
                    <X size={24} />
                  </button>
                </div>
                <SidebarContent activeTab={activeTab} onSelect={handleTabChange} onLogout={onLogout} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Extracted Content to avoid code duplication
const SidebarContent = ({ activeTab, onSelect, onLogout }: any) => (
  <>
    <div className="hidden lg:flex items-center gap-3 px-2 mb-10">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-amber-500/20" />
      <h2 className="text-xl font-black text-amber-400 tracking-tight">WORKCRED</h2>
    </div>

    <nav className="flex-grow space-y-2">
      <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => onSelect('overview')} />
      <NavItem icon={<Users size={20} />} label="Manage Users" active={activeTab === 'users'} onClick={() => onSelect('users')} />
      <NavItem icon={<Building2 size={20} />} label="Companies" active={activeTab === 'companies'} onClick={() => onSelect('companies')} />
    </nav>

    <button 
      onClick={onLogout}
      className="mt-auto flex items-center gap-3 px-4 py-4 text-gray-500 hover:text-red-400 transition-colors group border-t border-white/5"
    >
      <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
      <span className="font-bold text-sm">Logout</span>
    </button>
  </>
);