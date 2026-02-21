"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneSlash, FaMicrophone, FaVideo, FaExpand, FaCog, FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";
import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import { off } from "process";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  participantName: string;
  callId: string;
}

export const VideoCallModal = ({ isOpen, onClose, participantName, callId }: VideoCallModalProps) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  console.log("My Call ID:", callId);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const unsubscribers: (() => void)[] = [];

    if (isOpen) {
      // const initialCall = async () => {
      //   try {
      //     //step:1 -> get media;
      //     stream = await navigator.mediaDevices.getUserMedia({
      //       video: false,
      //       audio: true,
      //     });

      //     localStreamRef.current = stream;

      //     if (localVideoRef.current) {
      //       localVideoRef.current.srcObject = stream;
      //     }

      //     //step2:-> create peer connection
      //     const pc = new RTCPeerConnection({
      //       iceServers: [
      //         {
      //           urls: "stun:stun.l.google.com:19302"
      //         }
      //       ]
      //     });
      //     peerConnectionRef.current = pc;

      //     //step3:-> add local tracks to peer connection
      //     stream.getTracks().forEach((track) => {
      //       pc.addTrack(track, stream!);
      //     })

      //     //step4:-> Listen for remote tracks
      //     pc.ontrack = (event) => {
      //       if (remoteVideoRef.current) {
      //         remoteVideoRef.current.srcObject = event.streams[0];
      //       }
      //     }
      //     console.log('Peer connection initialized')
      //     await createOffer();
      //   } catch (err) {
      //     console.error("Error accessing media devices:", err);
      //   }
      // };
      const initialCall = async () => {
        try {
          const callDoc = doc(db, "calls", callId);
          const offerCandidates = collection(callDoc, "offerCandidates");
          const answerCandidates = collection(callDoc, "answerCandidates");
          

          const callSnapshot = await getDoc(callDoc);
          const callData = callSnapshot.data();

          // 1️⃣ Create peer connection
          const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
          });

          peerConnectionRef.current = pc;

          // 2️⃣ Get media
          const stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
          });

          localStreamRef.current = stream;

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }

          stream.getTracks().forEach((track: MediaStreamTrack) => {
            pc.addTrack(track, stream);
          });

          // 3️⃣ Remote stream
          pc.ontrack = (event) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = event.streams[0];
            }
          };

          // 🔥 ROLE DECISION
          if (!callData?.offer) {
            // =====================
            // 🟢 CALLER
            // =====================
            console.log("I am caller");

            // Send ICE to offerCandidates
            pc.onicecandidate = async (event) => {
              if (event.candidate) {
                await addDoc(offerCandidates, event.candidate.toJSON());
              }
            };

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            await setDoc(callDoc, {
              offer: {
                type: offer.type,
                sdp: offer.sdp,
              },
            });

            // Listen for answer
            const unsubscribeAnswer = onSnapshot(callDoc, async (snapshot) => {
              const data = snapshot.data();
              if (data?.answer && !pc.currentRemoteDescription) {
                await pc.setRemoteDescription(
                  new RTCSessionDescription(data.answer)
                );
                console.log("Answer received");
              }
            });

            // Listen for receiver ICE
            const unsubscribeAnswerCandidates = onSnapshot(answerCandidates, (snapshot) => {
              snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                  const candidate = new RTCIceCandidate(change.doc.data());
                  pc.addIceCandidate(candidate);
                }
              });
            });
            unsubscribers.push(unsubscribeAnswer);
            unsubscribers.push(unsubscribeAnswerCandidates);
          } else {
            // =====================
            // 🔵 RECEIVER
            // =====================
            console.log("I am receiver");

            // Send ICE to answerCandidates
            pc.onicecandidate = async (event) => {
              if (event.candidate) {
                await addDoc(answerCandidates, event.candidate.toJSON());
              }
            };

            await pc.setRemoteDescription(
              new RTCSessionDescription(callData.offer)
            );

            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            await updateDoc(callDoc, {
              answer: {
                type: answer.type,
                sdp: answer.sdp,
              },
            });

            // Listen for caller ICE
            const unsubscribeOfferCandidates = onSnapshot(offerCandidates, (snapshot) => {
              snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                  const candidate = new RTCIceCandidate(change.doc.data());
                  pc.addIceCandidate(candidate);
                }
              });
            });
            unsubscribers.push(unsubscribeOfferCandidates);
          }

        } catch (err) {
          console.error(err);
        }
      };
      initialCall();
    }

    // Cleanup: Stop camera tracks when modal closes
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop();
        });
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      unsubscribers.forEach(unsub => unsub());
    };
  }, [isOpen]);

  // useEffect(() => {
  //   if (!isOpen) return;

  //   const setupReceiver = async () => {
  //     const callDoc = doc(db, "calls", callId);
  //     const callData = (await getDoc(callDoc)).data();

  //     if (!callData?.offer) return; // Not receiver

  //     // 1️⃣ Create peer connection
  //     const pc = new RTCPeerConnection({
  //       iceServers: [
  //         { urls: "stun:stun.l.google.com:19302" }
  //       ],
  //     });

  //     peerConnectionRef.current = pc;

  //     // 2️⃣ Get media
  //     const localStream = await navigator.mediaDevices.getUserMedia({
  //       video: false,
  //       audio: true,
  //     });

  //     localStreamRef.current = localStream;
  //     localVideoRef.current!.srcObject = localStream;

  //     localStream.getTracks().forEach(track => {
  //       pc.addTrack(track, localStream);
  //     });

  //     // 3️⃣ Set remote offer
  //     await pc.setRemoteDescription(
  //       new RTCSessionDescription(callData.offer)
  //     );

  //     // 4️⃣ Create answer
  //     const answer = await pc.createAnswer();
  //     await pc.setLocalDescription(answer);

  //     // 5️⃣ Save answer to Firestore
  //     await updateDoc(callDoc, {
  //       answer: {
  //         type: answer.type,
  //         sdp: answer.sdp,
  //       },
  //     });

  //   };

  //   setupReceiver();
  // }, [isOpen]);

  const createOffer = async () => {
    const pc = peerConnectionRef.current;
    if (!pc) return;

    const callDoc = doc(db, "calls", callId);
    const offerCandidates = collection(callDoc, "offerCandidates");

    //step1:-> listen for ice candidates and store them
    pc.onicecandidate = async (event) => {
      if (event.candidate) {
        await addDoc(offerCandidates, event.candidate.toJSON());
      }
    };

    //step2:-> create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    //step3:-> save offer to firestore
    await setDoc(callDoc, {
      offer: {
        type: offerDescription.type,
        sdp: offerDescription.sdp
      }
    })
    console.log("Offer created and stored")
  }


  const handleEndCall = async () => {
    try {
      // 🔥 Delete call document
      await deleteDoc(doc(db, "calls", callId));
      console.log("Call document deleted");
    } catch (error) {
      console.error("Error deleting call:", error);
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    // Stop local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }

    // Close modal
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
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 flex items-center justify-center rounded-full transition-all active:scale-90 ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {isMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
              </button>

              <button
                onClick={() => setIsCameraOff(!isCameraOff)}
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