"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegUserCircle, FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

import { socket } from "@/lib/socket"; // ✅ ADD SOCKET

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>();
  const [notifCount, setNotifCount] = useState(0); // ✅ ADD COUNT

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown + Load user
  useEffect(() => {

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    getCandidate();

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  // Fetch logged-in user
  async function getCandidate() {
    try {
      const res = await fetch("/api/getCandidate");
      const json = await res.json();
      setUser(json.data);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  }

  // ✅ REGISTER SOCKET + LISTEN NOTIFICATIONS
  useEffect(() => {

    if (!user?._id) return; // wait until user loaded

    // Connect socket if needed
    if (!socket.connected) {
      socket.connect();
    }

    // Register user
    socket.emit("registerUser", user._id);

    console.log("🔔 Socket registered:", user._id);

    // Load old notifications
    fetch(`http://localhost:4000/api/notifications/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        const unread = data.filter(
          (n: any) => !n.isRead
        ).length;

        setNotifCount(unread);
      })
      .catch((err) =>
        console.error("Notification load error:", err)
      );

    // Listen realtime
    socket.on("newNotification", () => {
      setNotifCount((prev) => prev + 1);
    });

    return () => {
      socket.off("newNotification");
    };

  }, [user]);

  // Logout
  function logout() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">

        {/* LEFT — Logo */}
        <h1
          onClick={() => router.push("/home/candidate")}
          className="text-2xl font-black bg-gradient-to-r from-amber-500 via-orange-600 to-red-500 bg-clip-text text-transparent cursor-pointer"
        >
          WorkCred
        </h1>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-4 relative">

          {/* 🔔 Notifications */}
          <div
            onClick={() => router.push("/notifications")}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <FaBell className="text-gray-600" />

            {/* Count Badge */}
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                {notifCount}
              </span>
            )}
          </div>

          {/* Profile */}
          <div ref={dropdownRef} className="relative">

            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-50 border border-amber-200 cursor-pointer overflow-hidden"
            >
              {user?.profileImageUrl ? (
                <Image
                  src={user.profileImageUrl}
                  alt="profile"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <FaRegUserCircle className="w-6 h-6 text-emerald-400" />
              )}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-44 rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/profile/candidate");
                    }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100"
                  >
                    Visit Profile
                  </button>

                  <button
                    onClick={logout}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </nav>
  );
}