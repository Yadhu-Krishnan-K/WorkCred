// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { socket } from "@/lib/socket";
// import { VideoCallModal } from "@/components/VideoCall/videoCallModal";
// import { doc, onSnapshot, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// interface Message {
//   senderId: string;
//   receiverId: string;
//   message: string;
//   roomId: string;
// }

// export default function ChatPage() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [text, setText] = useState("");

//   const [isCalling, setIsCalling] = useState(false);
//   const [callRole, setCallRole] = useState<"caller" | "receiver" | null>(null);

//   const [callTarget, setCallTarget] = useState<string>("");



//   const searchParams = useSearchParams();

//   const senderId = searchParams.get("sender");
//   const receiverId = searchParams.get("receiver");
//   console.log(senderId, receiverId, "/////////////////////////////")

//   // 🚨 Prevent crash if params missing
//   if (!senderId || !receiverId) return null;

//   // ✅ Generate dynamic room ID
//   const roomId =
//     senderId < receiverId
//       ? `${senderId}_${receiverId}`
//       : `${receiverId}_${senderId}`;

//   // Helper function to trigger call
//   const startCall = async (name: string) => {
//     const callDoc = doc(db, "calls", roomId);
//     await setDoc(callDoc, {
//       callerId: senderId,
//       receiverId: receiverId,
//       status: "ringing", // Make sure this matches what the hook expects
//       createdAt: Date.now(),
//       endedAt:null,
//       offer: null,  // Clear old offers
//       answer: null  // Clear old answers
//     });
//     setCallTarget(name);
//     setCallRole("caller");   // 👈 YOU initiated
//     setIsCalling(true);
//   };

//   // ✅ Load old messages
//   useEffect(() => {
//     const loadMessages = async () => {
//       const res = await fetch(
//         `http://localhost:4000/api/chat/${senderId}/${receiverId}`
//       );
//       const data = await res.json();
//       setMessages(data);
//     };

//     loadMessages();
//   }, [senderId, receiverId]);

//   // ✅ Socket handling
//   useEffect(() => {
//     socket.emit("joinRoom", roomId);

//     socket.on("receiveMessage", (data: Message) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [roomId]);

//   //webrtc handling
//   useEffect(() => {
//     const callDoc = doc(db, "calls", roomId);

//     const unsub = onSnapshot(callDoc, snap => {
//       const data = snap.data();
//       if (!data) return;

//       // incoming call
//       if (
//         data.status === "ringing" &&
//         data.receiverId === senderId
//       ) {
//         setCallRole("receiver");
//         setIsCalling(true);
//       }

//     });

//     return () => unsub();
//   }, [roomId, senderId]);

//   const sendMessage = () => {
//     if (!text.trim()) return; // prevent empty messages

//     const data: Message = {
//       senderId,
//       receiverId,
//       message: text,
//       roomId,
//     };

//     socket.emit("sendMessage", data);
//     setText("");
//   };

//   return (
//     <>
//       <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-200">

//         {/* HEADER */}
//         <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
//           <h2 className="font-bold text-lg text-slate-800">Chat</h2>
//           <button className="rounded border-none bg-blue-700 text-amber-50 cursor-pointer hover:shadow-fuchsia-600" onClick={() => startCall('abc')}>Video Call</button>
//           <span className="text-xs text-emerald-500 font-semibold">
//             Online
//           </span>
//         </div>

//         {/* MESSAGES AREA */}
//         <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
//           {messages.map((msg, index) => {
//             const isMe = msg.senderId === senderId;

//             return (
//               <div
//                 key={index}
//                 className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`
//                   max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-md text-sm
//                   ${isMe
//                       ? "bg-emerald-500 text-white rounded-br-sm"
//                       : "bg-white text-slate-800 rounded-bl-sm"}
//                 `}
//                 >
//                   {msg.message || (
//                     <span className="italic opacity-60">
//                       (empty message)
//                     </span>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* INPUT AREA */}
//         <div className="bg-white p-4 border-t flex items-center gap-3">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 px-4 py-3 rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
//           />

//           <button
//             onClick={sendMessage}
//             className="px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 active:scale-95 transition-all shadow-md"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//       <VideoCallModal
//         isOpen={isCalling}
//         onClose={() => setIsCalling(false)}
//         participantName={callRole === "caller" ? receiverId : senderId}
//         callId={roomId}
//         role={callRole!}
//       />
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { socket } from "@/lib/socket";
import { VideoCallModal } from "@/components/VideoCall/videoCallModal";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  roomId: string;
}

export default function ChatPage() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const [isCalling, setIsCalling] = useState(false);
  const [callRole, setCallRole] = useState<"caller" | "receiver" | null>(null);

  const [callTarget, setCallTarget] = useState<string>("");

  const searchParams = useSearchParams();

  const senderId = searchParams.get("sender");
  const receiverId = searchParams.get("receiver");

  if (!senderId || !receiverId) return null;

  const roomId =
    senderId < receiverId
      ? `${senderId}_${receiverId}`
      : `${receiverId}_${senderId}`;

  // ⭐ Request Rating (FIXED)
  const requestRating = async () => {

    try {

      // determine rating type automatically
      const type =
        senderId < receiverId
          ? "userToCompany"
          : "companyToUser";

      const res = await fetch("/api/rating/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          receiverId,
          roomId,
          type
        }),
      });

      const data = await res.json();

      console.log("Rating request created:", data);

      alert("Rating request sent");

    } catch (err) {

      console.error("Rating request error:", err);

    }

  };

  // Helper function to trigger call
  const startCall = async (name: string) => {

    const callDoc = doc(db, "calls", roomId);

    await setDoc(callDoc, {
      callerId: senderId,
      receiverId: receiverId,
      status: "ringing",
      createdAt: Date.now(),
      endedAt: null,
      offer: null,
      answer: null,
    });

    setCallTarget(name);
    setCallRole("caller");
    setIsCalling(true);

  };

  // Load old messages
  useEffect(() => {

    const loadMessages = async () => {

      const res = await fetch(
        `http://localhost:4000/api/chat/${senderId}/${receiverId}`
      );

      const data = await res.json();

      setMessages(data);

    };

    loadMessages();

  }, [senderId, receiverId]);

  // Socket handling
  useEffect(() => {

    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };

  }, [roomId]);

  // WebRTC handling
  useEffect(() => {

    const callDoc = doc(db, "calls", roomId);

    const unsub = onSnapshot(callDoc, (snap) => {

      const data = snap.data();

      if (!data) return;

      if (data.status === "ringing" && data.receiverId === senderId) {

        setCallRole("receiver");
        setIsCalling(true);

      }

    });

    return () => unsub();

  }, [roomId, senderId]);

  const sendMessage = () => {

    if (!text.trim()) return;

    const data: Message = {
      senderId,
      receiverId,
      message: text,
      roomId,
    };

    socket.emit("sendMessage", data);

    setText("");

  };

  return (

    <>

      <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-200">

        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

          <h2 className="font-bold text-lg text-slate-800">
            Chat
          </h2>

          <div className="flex gap-3">

            <button
              onClick={requestRating}
              className="px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700"
            >
              Request Rating
            </button>

            <button
              className="rounded border-none bg-blue-700 text-amber-50 cursor-pointer px-4 py-2 hover:bg-blue-800"
              onClick={() => startCall("abc")}
            >
              Video Call
            </button>

          </div>

          <span className="text-xs text-emerald-500 font-semibold">
            Online
          </span>

        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">

          {messages.map((msg, index) => {

            const isMe = msg.senderId === senderId;

            return (

              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >

                <div
                  className={`
                    max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-md text-sm
                    ${
                      isMe
                        ? "bg-emerald-500 text-white rounded-br-sm"
                        : "bg-white text-slate-800 rounded-bl-sm"
                    }
                  `}
                >

                  {msg.message || (
                    <span className="italic opacity-60">(empty message)</span>
                  )}

                </div>

              </div>

            );

          })}

        </div>

        <div className="bg-white p-4 border-t flex items-center gap-3">

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
          />

          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 active:scale-95 transition-all shadow-md"
          >
            Send
          </button>

        </div>

      </div>

      <VideoCallModal
        isOpen={isCalling}
        onClose={() => setIsCalling(false)}
        participantName={callRole === "caller" ? receiverId : senderId}
        callId={roomId}
        role={callRole!}
      />

    </>

  );

}