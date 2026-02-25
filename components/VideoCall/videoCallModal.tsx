"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneSlash, FaMicrophone, FaVideo, FaExpand, FaCog, FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";

import { useWebRTCCall } from "@/hooks/useWebRTCCall";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  participantName: string;
  callId: string;
  role: "caller" | "receiver";
}

export const VideoCallModal = ({ isOpen, onClose, participantName, callId, role }: VideoCallModalProps) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const {
    localStream,
    remoteStream,
    callState,
    startCall,
    endCall
  } = useWebRTCCall({ callId, role });

  useEffect(() => {
    if (isOpen) {
      startCall();
    } else {
      endCall();
    }
  }, [isOpen]);
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (!remoteVideoRef.current || !remoteStream) {
      // alert('no remote video present')
      // console.log('error: no remote video present');
      return
    }

    // console.log('remote video stream ===')

    remoteVideoRef.current.srcObject = remoteStream;
    remoteVideoRef.current.muted = false;
    remoteVideoRef.current.volume = 1;

    const playPromise = remoteVideoRef.current.play();
    if (playPromise) {
      playPromise.catch(err => {
        console.warn("Remote autoplay blocked:", err);
      });
    }
  }, [remoteStream]);

  useEffect(() => {
    localStream?.getAudioTracks().forEach(track => {
      track.enabled = !isMuted;
    });
  }, [isMuted, localStream]);

  //
  useEffect(() => {
    console.log('callstate vdocl modl ln 73*********************************',callState)
    if (callState === "ended") {
      onClose();
    }
  }, [callState]);

  console.log("My Call ID:", callId);

  const handleEndCall = async () => {
    console.log('ending call============================videocall modal line74')
    await endCall();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-10">
          {/* Mesmerizing Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
          </motion.div>

          {/* Main Call Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="relative w-full max-w-6xl aspect-video bg-slate-950 rounded-[3rem] shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)] border border-white/10 overflow-hidden"
          >
            {/* REMOTE VIDEO (Main Background) */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              // poster="/api/placeholder/1200/800" // Optional placeholder
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            {/* Overlay if no remote feed yet */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                </div>
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Encrypted Connection</p>
              </div>
            </div>

            {/* Top Info Overlay */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-white font-black text-xs uppercase tracking-wider">{participantName}</span>
                  <span className="text-white/40 text-[9px] font-bold">00:42:15</span>
                </div>
              </div>
            </div>

            {/* LOCAL VIDEO (Self View - Picture in Picture) */}
            <div className="absolute bottom-32 right-8 w-64 aspect-video bg-slate-900 rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden group">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]" // Flip for natural mirror effect
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Your Camera</span>
              </div>
            </div>

            {/* Mesmerizing Control Bar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-10 py-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl z-20">
              <button
                onClick={() => localStream?.getAudioTracks().forEach(t => t.enabled = !isMuted)}
                className={`w-14 h-14 flex items-center justify-center rounded-full transition-all active:scale-90 ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {isMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
              </button>

              <button
                onClick={() => localStream?.getVideoTracks().forEach(t => t.enabled = !isCameraOff)}
                className={`w-14 h-14 flex items-center justify-center rounded-full transition-all active:scale-90 ${isCameraOff ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {isCameraOff ? <FaVideoSlash size={20} /> : <FaVideo size={20} />}
              </button>

              <div className="w-[1px] h-8 bg-white/10 mx-2" />

              <button
                onClick={handleEndCall}
                className="group relative h-14 px-10 bg-rose-500 hover:bg-rose-600 text-white rounded-[1.5rem] transition-all active:scale-95 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <FaPhoneSlash className="relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10 font-black text-xs uppercase tracking-widest">End Meeting</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};