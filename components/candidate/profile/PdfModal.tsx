"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaTimes, FaExternalLinkAlt, FaDownload } from "react-icons/fa";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | undefined;
  title?: string;
}

export const PdfModal = ({ isOpen, onClose, pdfUrl, title = "Resume Preview" }: PdfModalProps) => {
  if (!pdfUrl) return null;

    console.log('pdfUrl = ',pdfUrl)


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-6xl h-full rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                  <FaFilePdf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">{title}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Verified Document</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Optional: External Link Button */}
                <a 
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all border border-slate-200"
                >
                  <FaExternalLinkAlt /> Full Screen
                </a>
                
                <button
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all border border-slate-100 group"
                >
                  <FaTimes className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div className="grow bg-slate-100 relative">
              <iframe
                src={`${pdfUrl}#view=FitH&toolbar=1`}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            </div>

            {/* Footer / Status Bar */}
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Securely served via WorkCred Cloud Storage
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};