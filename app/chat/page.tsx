// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { socket } from "@/lib/socket";
// import { VideoCallModal } from "@/components/VideoCall/videoCallModal";

// interface Message {
//   senderId: string;
//   receiverId: string;
//   message: string;
//   roomId: string;
// }

// export default function ChatPage() {

//   const searchParams = useSearchParams();
//   const [ratingRequested, setRatingRequested] = useState(false);

//   const senderId = searchParams.get("sender") || "";
//   const receiverId = searchParams.get("receiver") || "";
//   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", typeof senderId, typeof receiverId)

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [text, setText] = useState("");
//   const [callOpen, setCallOpen] = useState(false);

//   if (!senderId || !receiverId) return null;

//   const roomId =
//     senderId < receiverId
//       ? `${senderId}_${receiverId}`
//       : `${receiverId}_${senderId}`;


//   console.log('roomId ========', roomId)
//   console.log('type of roomId = ', typeof roomId)

//   // -------------------------------
//   // Load previous messages
//   // -------------------------------
//   useEffect(() => {

//     async function loadMessages() {

//      
//       const data = await res.json();

//       setMessages(data);

//     }

//     loadMessages();

//   }, [senderId, receiverId]);


//   // ⭐ Check if rating request already exists
//   useEffect(() => {

//     const checkRatingRequest = async () => {

//       try {

//         const res = await fetch(`/api/rating/request/check/${roomId}`);
//         const data = await res.json();

//         if (data.exists) {
//           setRatingRequested(true);
//         }

//       } catch (err) {
//         console.error("Check rating request error:", err);
//       }

//     };

//     checkRatingRequest();

//   }, [roomId]);



//   // -------------------------------
//   // Socket setup
//   // -------------------------------
//   useEffect(() => {

//     socket.emit("registerUser", senderId);
//     socket.emit("joinRoom", roomId);

//     const handleMessage = (data: Message) => {
//       setMessages(prev => [...prev, data]);
//     };

//     const handleIncomingCall = (data: any) => {
//       if (data.roomId === roomId) setCallOpen(true);
//     };

//     const handleEndCall = () => {
//       setCallOpen(false);
//     };

//     socket.on("receiveMessage", handleMessage);
//     socket.on("incoming-call", handleIncomingCall);
//     socket.on("call-ended", handleEndCall);

//     return () => {
//       socket.off("receiveMessage", handleMessage);
//       socket.off("incoming-call", handleIncomingCall);
//       socket.off("call-ended", handleEndCall);
//     };

//   }, [roomId, senderId]);


//   // -------------------------------
//   // Send message
//   // -------------------------------
//   function sendMessage() {

//     if (!text.trim()) return;

//     const data: Message = {
//       senderId,
//       receiverId,
//       message: text,
//       roomId,
//     };

//     socket.emit("sendMessage", data);

//     setText("");

//   }


//   // -------------------------------
//   // Start Call
//   // -------------------------------
//   function startCall() {

//     setCallOpen(true);

//     socket.emit("call-user", {
//       from: senderId,
//       to: receiverId,
//       roomId
//     });

//   }


//   // -------------------------------
//   // End Call
//   // -------------------------------
//   function endCall() {

//     socket.emit("end-call", receiverId);

//     setCallOpen(false);

//   }


//   // -------------------------------
//   // Request Rating
//   // -------------------------------
//   async function requestRating() {

//     try {

//       const type =
//         senderId < receiverId
//           ? "userToCompany"
//           : "companyToUser";

//       const res = await fetch("/api/rating/request", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           receiverId,
//           roomId,
//           type
//         }),
//       });

//       await res.json();

//       alert("Rating request sent");

//       // ⭐ disable button after sending
//       setRatingRequested(true);

//     } catch (err) {

//       console.error("Rating request error:", err);

//     }

//   }


//   return (

//     <>

//       <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-200">

//         {/* Header */}

//         <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

//           <h2 className="font-bold text-lg text-slate-800">
//             Chat
//           </h2>

//           <div className="flex gap-3">

//             <button
//               onClick={requestRating}
//               disabled={ratingRequested}
//               className="px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 disabled:bg-gray-400"
//             >
//               {ratingRequested ? "Rating Requested" : "Request Rating"}
//             </button>

//             <button
//               onClick={startCall}
//               className="rounded border-none bg-blue-700 text-amber-50 cursor-pointer px-4 py-2 hover:bg-blue-800"
//             >
//               Video Call
//             </button>

//           </div>

//           <span className="text-xs text-emerald-500 font-semibold">
//             Online
//           </span>

//         </div>


//         {/* Messages */}

//         <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">

//           {messages.map((msg, index) => {

//             const isMe = msg.senderId === senderId;

//             return (

//               <div
//                 key={index}
//                 className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//               >

//                 <div
//                   className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-md text-sm ${isMe
//                       ? "bg-emerald-500 text-white rounded-br-sm"
//                       : "bg-white text-slate-800 rounded-bl-sm"
//                     }`}
//                 >

//                   {msg.message || (
//                     <span className="italic opacity-60">(empty message)</span>
//                   )}

//                 </div>

//               </div>

//             );

//           })}

//         </div>


//         {/* Message Input */}

//         <div className="bg-white p-4 border-t flex items-center gap-3">

//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 px-4 py-3 rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
//           />

//           <button
//             onClick={sendMessage}
//             className="px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600"
//           >
//             Send
//           </button>

//         </div>

//       </div>


//       {/* Video Call Modal */}

//       <VideoCallModal
//         isOpen={callOpen}
//         roomId={roomId}
//         userId={senderId}
//         userName={senderId}
//         onClose={endCall}
//       />

//     </>

//   );

// }
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { socket } from "@/lib/socket";
import { VideoCallModal } from "@/components/VideoCall/videoCallModal";

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  roomId: string;
}

export default function ChatPage() {

  const searchParams = useSearchParams();
  const [ratingRequested, setRatingRequested] = useState(false);

  const senderId = searchParams.get("sender") || "";
  const receiverId = searchParams.get("receiver") || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [callOpen, setCallOpen] = useState(false);

  if (!senderId || !receiverId) return null;

  const roomId =
    senderId < receiverId
      ? `${senderId}_${receiverId}`
      : `${receiverId}_${senderId}`;

  /* LOAD MESSAGES */
  useEffect(() => {
    async function loadMessages() {
      const res = await fetch(
        `NEXT_PUBLIC_BACKEND_URL/api/chat/${senderId}/${receiverId}`
      );
      const data = await res.json();
      setMessages(data);
    }
    loadMessages();
  }, [senderId, receiverId]);

  /* CHECK RATING */
  useEffect(() => {
    const checkRatingRequest = async () => {
      try {
        const res = await fetch(`/api/rating/request/check/${roomId}`);
        const data = await res.json();
        if (data.exists) setRatingRequested(true);
      } catch (err) {
        console.error("Check rating request error:", err);
      }
    };
    checkRatingRequest();
  }, [roomId]);

  /* SOCKET */
  useEffect(() => {

    socket.emit("registerUser", senderId);
    socket.emit("joinRoom", roomId);

    const handleMessage = (data: Message) => {
      setMessages(prev => [...prev, data]);
    };

    const handleIncomingCall = (data: any) => {
      if (data.roomId === roomId) setCallOpen(true);
    };

    const handleEndCall = () => {
      setCallOpen(false);
    };

    socket.on("receiveMessage", handleMessage);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-ended", handleEndCall);

    return () => {
      socket.off("receiveMessage", handleMessage);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-ended", handleEndCall);
    };

  }, [roomId, senderId]);

  /* SEND */
  function sendMessage() {
    if (!text.trim()) return;

    const data: Message = {
      senderId,
      receiverId,
      message: text,
      roomId,
    };

    socket.emit("sendMessage", data);
    setText("");
  }

  /* CALL */
  function startCall() {
    setCallOpen(true);
    socket.emit("call-user", {
      from: senderId,
      to: receiverId,
      roomId
    });
  }

  function endCall() {
    socket.emit("end-call", receiverId);
    setCallOpen(false);
  }

  /* RATING */
  async function requestRating() {
    try {
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

      await res.json();
      alert("Rating request sent");
      setRatingRequested(true);

    } catch (err) {
      console.error("Rating request error:", err);
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 via-white to-slate-200">

        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur border-b px-6 py-4 flex items-center justify-between shadow-sm">

          <h2 className="font-black text-lg text-slate-800 tracking-tight">
            Chat
          </h2>

          <div className="flex gap-3">

            <button
              onClick={requestRating}
              disabled={ratingRequested}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition disabled:bg-gray-400"
            >
              {ratingRequested ? "Rating Requested" : "Request Rating"}
            </button>

            <button
              onClick={startCall}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition"
            >
              Video Call
            </button>

          </div>

          <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Online
          </span>

        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">

          {messages.map((msg, index) => {

            const isMe = msg.senderId === senderId;

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >

                <div
                  className={`max-w-xs md:max-w-md px-5 py-3 text-sm shadow-lg transition ${isMe
                      ? "bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-2xl rounded-br-md"
                      : "bg-white text-slate-800 rounded-2xl rounded-bl-md border border-slate-100"
                    }`}
                >

                  {msg.message || (
                    <span className="italic opacity-60">(empty message)</span>
                  )}

                </div>

              </div>
            );

          })}

        </div>

        {/* INPUT */}
        <div className="bg-white/80 backdrop-blur p-4 border-t flex items-center gap-3 shadow-inner">

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-5 py-3 rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />

          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-full font-semibold shadow hover:scale-105 transition"
          >
            Send
          </button>

        </div>

      </div>

      {/* VIDEO CALL MODAL */}
      <VideoCallModal
        isOpen={callOpen}
        roomId={roomId}
        userId={senderId}
        userName={senderId}
        onClose={endCall}
      />
    </>
  );
}