"use client";

import { useEffect, useRef, useState } from "react";
import {
    doc,
    setDoc,
    updateDoc,
    onSnapshot,
    collection,
    addDoc,
    getDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Console } from "console";

type Role = "caller" | "receiver";
type CallState = "idle" | "connecting" | "connected" | "ended";

interface UseWebRTCCallProps {
    callId: string;
    role: Role;
}

export function useWebRTCCall({ callId, role }: UseWebRTCCallProps) {
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const cleanupFns = useRef<(() => void)[]>([]);
    const endingRef = useRef(false);


    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [callState, setCallState] = useState<CallState>("idle");

    console.log('callstate on initial 5555555555555555555555', callState)



    useEffect(() => {
        const callDoc = doc(db, "calls", callId);

        const unsub = onSnapshot(callDoc, snap => {
            const data = snap.data();
            console.log('data from snap shot line41====.>>>>>>>>>>>>>>>>>', data)
            // ONLY end the call if we were actually in a call/connecting state
            if (data?.status === "ended" && callState !== "ended" && callState !== "idle") {
                console.log('Remote peer ended the call');
                endCall(true);
            }
        });

        return () => unsub();
    }, [callId, callState]); // Add callState to dependencies to ensure logic has latest value






    const createPeerConnection = () => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        pc.ontrack = (event) => {
            const stream = event.streams[0];
            console.log(
                "REMOTE TRACKS:",
                stream.getTracks().map(t => ({
                    kind: t.kind,
                    enabled: t.enabled,
                    muted: t.muted,
                    readyState: t.readyState
                }))
            );

            setRemoteStream(stream);
        };

        pc.onconnectionstatechange = () => {
            if (
                pc.connectionState === "disconnected" ||
                pc.connectionState === "failed"
            ) {
                endCall();
            }
        };

        pcRef.current = pc;
        return pc;
    };





    const getLocalMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
        });

        localStreamRef.current = stream;
        setLocalStream(stream);

        stream.getTracks().forEach(track => {
            pcRef.current?.addTrack(track, stream);
        });
    };





    const startAsCaller = async () => {
        console.log('callstate ====', callState)
        if (callState !== "idle" && callState !== "ended") return;

        setCallState("connecting");
        console.log("Caller: Starting...");

        const callDoc = doc(db, "calls", callId);

        const offerCandidates = collection(callDoc, "offerCandidates");
        const answerCandidates = collection(callDoc, "answerCandidates");
        console.log('offer and answer candidates from startAsreceiver line 180========================################################################')
        console.log('offerCandidates = ', offerCandidates)
        console.log('answerCandidates = ', answerCandidates)

        const pc = createPeerConnection();
        await getLocalMedia();

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                addDoc(offerCandidates, event.candidate.toJSON());
            }
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // Use updateDoc instead of setDoc to avoid wiping out the whole document
        await updateDoc(callDoc, {
            offer: { type: offer.type, sdp: offer.sdp },
            status: "ringing"
        });
        console.log("Caller: Offer sent to Firebase");

        const unsubAnswer = onSnapshot(callDoc, async (snap) => {
            const data = snap.data();
            if (data?.answer && !pc.currentRemoteDescription) {
                console.log("Caller: Received Answer");
                await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
                setCallState("connected");
            }
        });

        const unsubAnswerIce = onSnapshot(answerCandidates, (snap) => {
            snap.docChanges().forEach(change => {
                if (change.type === "added" && pc.remoteDescription) {
                    pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
                }
            });
        });

        cleanupFns.current.push(unsubAnswer, unsubAnswerIce);
    };





    const startAsReceiver = async () => {
        setCallState("connecting");
        console.log("Receiver: Starting...");
        const callDoc = doc(db, "calls", callId);
        await updateDoc(callDoc, {
            offer: null,
            answer: null,
            status: "ringing"
        });
        const pc = createPeerConnection();
        await getLocalMedia();

        const offerCandidates = collection(callDoc, "offerCandidates");
        const answerCandidates = collection(callDoc, "answerCandidates");

        console.log('offer and answer candidates from startAsreceiver line 180========================################################################')
        console.log('offerCandidates = ', offerCandidates)
        console.log('answerCandidates = ', answerCandidates)

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                addDoc(answerCandidates, event.candidate.toJSON());
            }
        };

        const unsubOffer = onSnapshot(callDoc, async (snap) => {
            const data = snap.data();
            // Crucial: Only proceed if there is an offer AND we haven't set it yet
            if (data?.offer && !pc.currentRemoteDescription) {
                console.log("Receiver: Found Offer, setting remote description...");
                await pc.setRemoteDescription(new RTCSessionDescription(data.offer));

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                await updateDoc(callDoc, {
                    answer: { type: answer.type, sdp: answer.sdp },
                    status: "ongoing"
                });
                setCallState("connected");
            }
        });

        const unsubOfferIce = onSnapshot(offerCandidates, (snap) => {
            snap.docChanges().forEach(change => {
                if (change.type === "added" && pc.remoteDescription) {
                    pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
                }
            });
        });

        cleanupFns.current.push(unsubOffer, unsubOfferIce);
    };





    const startCall = async () => {
        endingRef.current = false;
        setCallState("idle");
        setRemoteStream(null);
        if (role === "caller") {
            console.log('startascaller..>>>>>>>>>>>>>>>>>')
            await startAsCaller();
        } else {
            await startAsReceiver();
        }
    };





    const endCall = async (skipUpdate = false) => {
        console.log('ending call ======usewebrtchook line 230>>>>>>>>>>>>>>>')
        console.log('callId from hook line 231 ===============', callId)
        if (endingRef.current) return;
        endingRef.current = true;

        const callDoc = doc(db, "calls", callId);

        try {
            if (!skipUpdate) {
                await updateDoc(callDoc, {
                    status: "ended",
                    endedAt: Date.now()
                });
            }
        } catch (error) {
            console.error("END CALL UPDATE FAILED:", error);
        }

        cleanupFns.current.forEach(fn => fn());
        cleanupFns.current = [];

        pcRef.current?.close();
        pcRef.current = null;

        localStreamRef.current?.getTracks().forEach(t => t.stop());
        localStreamRef.current = null;

        setRemoteStream(null)
        setLocalStream(null)

        setCallState("ended");
    };





    return {
        localStream,
        remoteStream,
        callState,
        startCall,
        endCall
    };
}