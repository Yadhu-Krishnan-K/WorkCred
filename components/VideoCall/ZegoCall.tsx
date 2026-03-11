"use client";

import { useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket";

interface Props {
  roomId: string;
  userId: string;
  userName: string;
  onEndCall: () => void;
}

export default function ZegoCall({
  roomId,
  userId,
  userName,
  onEndCall
}: Props) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const zpRef = useRef<any>(null)

  useEffect(() => {
    // let mounted = true
    async function startCall() {
      // if(!mounted)return

      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );

      const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userId,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current = zp;

      zp.joinRoom({

        container: containerRef.current!,

        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall
        },
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,

        showScreenSharingButton: false,

        onLeaveRoom: () => {

          onEndCall();

        }

      });

    }

    startCall();

    return () => {
      // mounted = false;
      if (zpRef.current) {

        zpRef.current.destroy();

        zpRef.current = null;

      }
    }

  }, [roomId, userId, userName, onEndCall]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}