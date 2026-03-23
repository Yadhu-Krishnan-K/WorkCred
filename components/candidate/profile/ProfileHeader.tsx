"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaRegUserCircle, 
  FaStar, 
  FaCamera,
  FaAward,
  FaPen,
  FaFilePdf
} from "react-icons/fa";

interface Props {
  candidate: any;
  isUploading: boolean;
  handleUpload:(file:File) => void;
  setFile: any;
  onOpenEdit: () => void;
  onViewResume: () => void;
}

export const ProfileHeader = ({ candidate, isUploading, handleUpload, setFile, onOpenEdit, onViewResume }: Props) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white shadow-2xl shadow-slate-200/60 flex flex-col lg:flex-row items-start gap-10 relative overflow-hidden"
  >
    {/* Profile Image & Rating Badge */}
    <div className="relative group mx-auto lg:mx-0">
      <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
        <div className="w-full h-full rounded-[2.3rem] bg-white overflow-hidden relative">
          {isUploading ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-6 h-6 border-2 border-fuchsia-500 border-t-white rounded-full animate-spin" />
            </div>
          ) : candidate?.profileImageUrl ? (
            <Image src={candidate.profileImageUrl} alt="Profile" fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50">
              <FaRegUserCircle className="w-20 h-20 text-slate-200" />
            </div>
          )}
        </div>
      </div>

          {/* dummy data for rate */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-2">
        <FaStar className="text-amber-400 w-4 h-4" />
        <span className="font-black text-slate-800 text-sm">{candidate?.avgRating || "5.0"}</span>
      </div>
          {/* --------------------------------- */}
      <label htmlFor="profileImageUpload" className="absolute top-2 right-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg cursor-pointer hover:bg-emerald-500 hover:text-white transition-all">
        <FaCamera className="w-4 h-4" />
        <input
          id="profileImageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>{
                const selectedFile = e.target.files?.[0];
                if (!selectedFile) return;

                setFile(selectedFile);
                handleUpload(selectedFile);
            } 
          } // && onImageUpload(e.target.files[0])}
        />
      </label>
    </div>

    {/* Main Content */}
    <div className="grow space-y-6 text-center lg:text-left">
      <div className="space-y-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {candidate?.fullName}
          </h2>
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-lg">
              {candidate?.experience ? `${candidate.experience} years Exp` : "Add experience"}
            </span>


            {candidate?.pdfUrl && (
              <button 
                onClick={onViewResume}
                className="flex items-center gap-2 px-3 py-1 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-[10px] font-black uppercase rounded-lg transition-all border border-slate-200 hover:border-red-200 shadow-sm"
              >
                <FaFilePdf />
                View Resume
              </button>
            )}


            <button onClick={onOpenEdit} className="text-slate-300 hover:text-emerald-500 transition-colors">
              <FaPen className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-slate-500 font-medium max-w-2xl leading-relaxed italic">
          "{candidate?.description || "No description added yet"}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Core Expertise</p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {candidate?.skills.length
            ?(candidate?.skills).map((skill: string, index: number) => (
              <span key={index} className="px-4 py-2 bg-slate-900 text-white text-[11px] font-bold rounded-xl shadow-sm">
                {skill}
              </span>
            ))
            :"none added"
            }
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Academic Credential</p>
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
              <FaAward />
            </div>
            <span className="text-sm font-bold text-slate-700">{candidate?.qualification || "Qualification not added"}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);