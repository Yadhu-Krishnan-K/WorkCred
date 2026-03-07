import { motion, AnimatePresence } from "framer-motion";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData: any;
  setEditData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isParsing: boolean;
  onResumeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditProfileModal = ({ 
  isOpen, onClose, editData, setEditData, onSubmit, isParsing, onResumeUpload 
}: EditProfileModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl border border-white overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="p-10">
              <div className="mb-8 flex justify-between items-start">
                <div>
                  <div className="w-12 h-2 bg-emerald-500 rounded-full mb-4" />
                  <h3 className="text-3xl font-black text-slate-800">Refine Persona</h3>
                  <p className="text-sm text-slate-500 font-medium">Auto-fill your profile with a PDF.</p>
                </div>

                <label className={`relative group cursor-pointer flex flex-col items-center justify-center w-24 h-24 rounded-3xl border-2 border-dashed transition-all ${isParsing ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-400 bg-slate-50'}`}>
                  <input type="file" className="hidden" accept=".pdf" onChange={onResumeUpload} disabled={isParsing} />
                  {isParsing ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-500 border-t-transparent" />
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <span className="text-[9px] font-black uppercase text-slate-400 text-center">Upload PDF</span>
                    </>
                  )}
                </label>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Display Name</label>
                    <input
                      type="text"
                      value={editData.fullName}
                      onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-bold"
                    />
                  </div>
                  
                  {/* Experience */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Experience Level</label>
                    <input
                      type="text"
                      value={editData.experience}
                      onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-bold"
                    />
                  </div>

                  {/* Qualification */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Qualification</label>
                    <input
                      type="text"
                      value={editData.qualification}
                      onChange={(e) => setEditData({ ...editData, qualification: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-bold"
                    />
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Professional Bio</label>
                    <textarea
                      rows={3}
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-medium"
                    />
                  </div>

                  {/* Skills */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Skills (comma separated)</label>
                    <input
                      type="text"
                      value={editData.skills}
                      onChange={(e) => setEditData({ ...editData, skills: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={onClose} className="flex-1 py-5 rounded-2xl bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-5 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                    Update Portfolio
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};