"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Notification = {
  _id: string;
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const router = useRouter();

  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Load notifications
  useEffect(() => {

    async function loadNotifications() {
      try {

        // Try candidate first
        let res = await fetch("/api/getCandidate");
        let json = await res.json();

        let userId = json?.data?._id;

        // If not candidate, try company
        if (!userId) {
          res = await fetch("/api/getCompany");
          json = await res.json();
          userId = json?.data?._id;
        }

        if (!userId) return;

        // Fetch notifications
        const notifRes = await fetch(
          `NEXT_PUBLIC_BACKEND_URL/api/notifications/${userId}`
        );

        const notifData = await notifRes.json();

        setData(notifData);

      } catch (err) {
        console.error("Notification fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();

  }, []);

  // Open notification
  const openNotification = async (n: Notification) => {
    try {

      // Mark as read
      await fetch(
        `NEXT_PUBLIC_BACKEND_URL/api/notifications/${n._id}`,
        {
          method: "PUT",
        }
      );

      // Go to target page
      if (n.link) {
        router.push(n.link);
      }

    } catch (err) {
      console.error("Open notification error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">

        <h1 className="text-2xl font-bold mb-6 text-slate-800">
          Notifications
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500 text-center">
            Loading...
          </p>
        )}

        {/* No Data */}
        {!loading && data.length === 0 && (
          <p className="text-gray-500 text-center">
            No notifications yet
          </p>
        )}

        {/* List */}
        <div className="space-y-3">

          {data.map((n) => (
            <div
              key={n._id}
              onClick={() => openNotification(n)}
              className={`
                p-4 rounded-lg border cursor-pointer
                transition hover:bg-slate-50
                ${!n.isRead
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200"}
              `}
            >
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {n.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-1">
                    {n.message}
                  </p>
                </div>

                {!n.isRead && (
                  <span className="text-xs text-blue-600 font-semibold">
                    NEW
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}