import Image from "next/image";
import { FaBuilding, FaLink, FaChevronDown, FaBroadcastTower, FaCircle } from "react-icons/fa";

export const AcceptedRequests = ({ companies }: { companies: any[] }) => (
  <aside className="relative">
    {/* Section Header with "Scanning" status */}
    <div className="flex items-center justify-between mb-6 px-2">
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-2">
        <FaBroadcastTower className="animate-pulse text-fuchsia-500" /> 
        Active_Uplinks
      </h3>
      <span className="text-[9px] font-mono text-slate-600 bg-slate-900 border border-slate-800 px-2 py-0.5">
        COUNT: {companies.length}
      </span>
    </div>

    <div className="relative overflow-hidden bg-slate-950/50 border border-slate-800 rounded-br-[3rem] p-6 backdrop-blur-md shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
      {/* Background scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none opacity-20" />

      {companies.length > 0 ? (
        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            {companies.map((company, i) => (
              <div 
                key={i} 
                className="group flex items-center gap-4 p-3 border border-transparent hover:border-cyan-500/30 hover:bg-slate-900/50 transition-all cursor-crosshair relative overflow-hidden"
              >
                {/* Company Logo with Glitch Frame */}
                <div className="relative w-12 h-12 flex-shrink-0 bg-slate-900 border border-slate-800 group-hover:border-cyan-400 transition-colors">
                  {company.profileImageUrl ? (
                    <Image src={company.profileImageUrl} alt="Logo" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700 group-hover:text-cyan-500">
                      <FaBuilding />
                    </div>
                  )}
                  {/* Small corner detail */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-fuchsia-600 scale-0 group-hover:scale-100 transition-transform" />
                </div>

                <div className="grow min-w-0">
                  <h4 className="text-xs font-black text-slate-200 truncate group-hover:text-white group-hover:tracking-wider transition-all">
                    {company.companyName.toUpperCase()}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] text-cyan-600 font-mono font-bold uppercase tracking-tighter">
                      {company.companyType || "CORP_ENTITY"}
                    </span>
                    <div className="h-[1px] w-4 bg-slate-800" />
                    <span className="text-[8px] text-slate-500 font-mono italic">
                      EST_2026
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="relative flex items-center justify-center">
                     <FaCircle className="text-[6px] text-emerald-500 animate-ping absolute" />
                     <FaLink className="text-[10px] text-emerald-500 relative z-10" />
                  </div>
                  <span className="text-[7px] font-mono text-slate-600 uppercase tracking-tighter">Secure</span>
                </div>
              </div>
            ))}
          </div>

          {companies.length >= 3 && (
            <button className="w-full py-2 flex items-center justify-center gap-2 border border-slate-800 bg-slate-900/50 text-slate-500 hover:text-cyan-400 hover:bg-slate-800 transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest">Load_More_Data</span>
              <FaChevronDown className="text-[10px] group-hover:translate-y-1 transition-transform" />
            </button>
          )}
        </div>
      ) : (
        <div className="relative z-10 py-12 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
          <FaBroadcastTower className="text-slate-800 text-3xl mb-4 animate-pulse" />
          <p className="text-[10px] font-mono text-amber-500/70 tracking-widest uppercase animate-pulse">
            No_Uplinks_Found
          </p>
          <div className="mt-4 h-1 w-24 bg-slate-800 overflow-hidden relative">
            <div className="absolute h-full w-1/3 bg-amber-500/30 animate-[loading_2s_infinite]" />
          </div>
        </div>
      )}
    </div>

    {/* Custom Loading Animation for empty state */}
    <style jsx>{`
      @keyframes loading {
        0% { left: -40%; }
        100% { left: 100%; }
      }
    `}</style>
  </aside>
);