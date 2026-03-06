import { FaStar, FaTerminal, FaQuoteLeft } from "react-icons/fa";

interface Rating {
  company: string;
  rating: number;
  comment: string;
  date: string;
}

export const FeedbackSection = ({ ratings }: { ratings: Rating[] }) => (
  <div className="mt-10">
    {/* Section Header */}
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px flex-grow bg-gradient-to-r from-transparent to-amber-500/50" />
      <h3 className="text-xs font-black uppercase tracking-[0.4em] text-amber-500 flex items-center gap-3">
        <FaTerminal className="animate-pulse" /> 
        External_Evaluations
      </h3>
      <div className="h-px w-12 bg-amber-500/50" />
    </div>

    <div className="grid gap-6">
      {ratings.map((rate, i) => (
        <div 
          key={i} 
          className="group relative bg-slate-900/40 border border-slate-800 p-6 transition-all hover:border-amber-500/50 hover:bg-slate-900/60"
        >
          {/* Decorative Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar Placeholder / Icon */}
              <div className="relative w-12 h-12 flex items-center justify-center bg-slate-950 border border-slate-700 group-hover:border-amber-500/50 transition-colors">
                <FaQuoteLeft className="text-slate-600 group-hover:text-amber-500 transition-colors" />
                {/* Side status bar */}
                <div className="absolute -left-[1px] top-1/4 w-[2px] h-1/2 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              </div>
              
              <div>
                <span className="block text-[10px] font-mono text-amber-500/70 uppercase tracking-widest">Source_Node</span>
                <span className="font-black text-white italic tracking-tight text-lg">{rate.company.toUpperCase()}</span>
              </div>
            </div>

            {/* Cyber Rating Stars */}
            <div className="flex gap-1 bg-slate-950/50 p-2 border border-slate-800">
              {[...Array(5)].map((_, idx) => (
                <FaStar 
                  key={idx} 
                  className={`w-3 h-3 ${idx < rate.rating ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]" : "text-slate-800"}`} 
                />
              ))}
            </div>
          </div>

          {/* Comment Area */}
          <div className="relative pl-6 border-l border-slate-800 group-hover:border-amber-500/30 transition-colors">
            <p className="text-slate-400 font-mono text-sm leading-relaxed">
              <span className="text-amber-500/50 mr-2">LOG_MSG:</span>
              {rate.comment}
            </p>
          </div>

          {/* Footer Data */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800/50">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-mono text-slate-500 uppercase">Integrity_Verified</span>
            </div>
            <p className="text-[10px] text-slate-600 font-mono tracking-tighter">
              TIMESTAMP // {rate.date.replace(" ", "_").toUpperCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);