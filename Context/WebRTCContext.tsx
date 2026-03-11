"use client";

import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { socket } from "@/lib/socket";

type Role = "caller" | "receiver" | "";
type CallState = "connecting" | "connected" | "idle"

interface WebRTCContextType {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  startCall: (targetId: string) => Promise<void>;
  answerCall: (offer: RTCSessionDescriptionInit, callerId: string) => Promise<void>;
  endCall: () => void;
  callState: CallState;
  role: Role;
}

const WebRTCContext = createContext<WebRTCContextType | null>(null);

export const WebRTCProvider = ({ children }: { children: React.ReactNode }) => {
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callState, setCallState] = useState<CallState>("idle")
  const [role, setRole] = useState<Role>("")
  const [peerId, setPeerId] = useState<string | null>(null);

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      {
        urls: "turn:openrelay.metered.ca:80?transport=tcp",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
      {
        urls: "turn:openrelay.metered.ca:443?transport=tcp",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
    ],
  };

  const createPeer = () => {
    const pc = new RTCPeerConnection(iceServers);

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    pcRef.current = pc;

    return pc;
  };

  const getLocalMedia = async (pc: RTCPeerConnection) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    setLocalStream(stream);

    stream.getTracks().forEach((track) => {
      pc?.addTrack(track, stream);
    });
  };

  const startCall = async (targetId: string) => {
    setPeerId(targetId)
    const pc = createPeer();
    setRole("caller")
    setCallState("connecting")
    try {
      await getLocalMedia(pc);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("call-user", {
        targetId,
        offer,
      });
    } catch (err) {
      console.error("Failed to start call:", err);
    }

  };

  const answerCall = async (offer: RTCSessionDescriptionInit, callerId: string) => {
    const pc = createPeer();
    setRole("receiver")
    await getLocalMedia(pc);

    await pc.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("answer-call", {
      callerId,
      answer,
    })
    setCallState("connected")
  };

  const endCall = () => {
    pcRef.current?.close();
    pcRef.current = null;

    localStream?.getTracks().forEach((t) => t.stop());

    setLocalStream(null);
    setRemoteStream(null);
    setCallState('idle')
    setRole("")

    socket.emit("end-call");
  };


  useEffect(() => {
    socket.on("sendingOffer", async ({ offer, callerId }) => {
      console.log('offer recieved = ',offer)
      setCallState("connecting")
      await answerCall(offer, callerId);
    });

    socket.on("answer-made", async ({ answer }) => {
      await pcRef.current?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      setCallState("connected")
    });

    socket.on("ice-candidate", async (candidate) => {
      try {
        if (!pcRef.current?.remoteDescription) return;

        await pcRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (err) {
        console.error("ICE error", err);
      }
    });

    socket.on("call-ended", endCall);

    return () => {
      socket.off("sendingOffer");
      socket.off("answer-made");
      socket.off("ice-candidate");
      socket.off("call-ended",endCall);
    };
  }, []);

  return (
    <WebRTCContext.Provider
      value={{
        localStream,
        remoteStream,
        startCall,
        answerCall,
        endCall,
        callState,
        role
      }}
    >
      {children}
    </WebRTCContext.Provider>
  );
};

export const useWebRTC = () => {
  const ctx = useContext(WebRTCContext);
  if (!ctx) throw new Error("useWebRTC must be used inside provider");
  return ctx;
};