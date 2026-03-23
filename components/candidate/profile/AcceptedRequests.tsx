import Image from "next/image";
import { FaBuilding, FaCheckCircle, FaCross, FaArrowDown, FaRocket } from "react-icons/fa";

export const AcceptedRequests = ({ companies, onSelectCompany }: { companies: any[], onSelectCompany: (c: any) => void }) => (  <aside>
    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
      <span className="w-2 h-6 bg-blue-500 rounded-full" />
      Requests Accepted
    </h3>
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
      {companies.length > 0 ? (
        <>
          <div className="space-y-6">
            {companies.map((company, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 group cursor-pointer"
                onClick={() => onSelectCompany(company)}
              >
                <div className="relative w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 overflow-hidden">
                  {company.profileImageUrl ? (
                    <Image src={company.profileImageUrl} alt="Logo" fill className="object-cover" />
                  ) : <FaBuilding />}
                </div>
                <div className="grow">
                  <h4 className="text-sm font-bold text-slate-800">{company.companyName}</h4>
                  <p className="text-[10px] text-slate-500 font-medium uppercase">{company.companyType || "Organization"}</p>
                </div>
                <div className="flex flex-col items-end">
                  <FaCheckCircle className="text-emerald-500" />
                  <span className="text-[8px] text-slate-300 mt-1 font-bold">JAN 2026</span>
                </div>
              </div>
            ))}
          </div>
          {companies.length >= 3 && (
            <div className="w-full py-4 flex items-center justify-center">
              <button className="w-8 h-8 flex justify-center items-center rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg cursor-pointer">
                <FaArrowDown />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center gap-2 border border-dashed border-gray-400 rounded-2xl text-center p-4">
          <p className="text-amber-500 text-sm">No companies yet</p>
          <FaRocket className="text-blue-700" />
        </div>
      )}
    </div>
  </aside>
);