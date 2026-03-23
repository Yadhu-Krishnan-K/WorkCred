import { FaStar, FaLightbulb } from "react-icons/fa";

interface Rating {
  company: string;
  rating: number;
  comment: string;
  date: string;
}

export const FeedbackSection = ({ ratings }: { ratings: Rating[] }) => (
  <div className="mt-10">
    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
      <span className="w-2 h-6 bg-amber-500 rounded-full" />
      Past Feedback Given
    </h3>
    <div className="grid gap-4">
      {
      ratings.length?
      ratings.map((rate, i) => (
        <div key={i} className="group bg-white border border-slate-100 p-6 rounded-3xl hover:border-amber-200 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <FaLightbulb />
              </div>
              <span className="font-bold text-slate-700">{rate.company}</span>
            </div>
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, idx) => (
                <FaStar key={idx} className={idx < rate.rating ? "fill-current" : "text-slate-100"} />
              ))}
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed italic">"{rate.comment}"</p>
          <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-tighter">{rate.date}</p>
        </div>
      ))
      :(<div className="flex-1 p-5">
        <p>no ratings</p>
      </div>)
      }
    </div>
  </div>
);