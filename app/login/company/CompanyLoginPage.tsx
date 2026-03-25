// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const error = searchParams.get("error");

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const res = await signIn("company-credentials", {
//       email: data.email,
//       password: data.password,
//       redirect: false, // IMPORTANT
//     });

//     setLoading(false);

//     if (res?.ok) {
//       router.push("/home/company");
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

//         <h1 className="text-3xl font-bold text-gray-900">
//           Company <span className="text-amber-500">Login</span>
//         </h1>

//         <p className="mt-2 text-gray-600">
//           Login to manage your company account
//         </p>

//         {error && (
//           <p className="mt-3 text-sm text-red-500">
//             Login failed. Please try again.
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           <input
//             type="email"
//             placeholder="Company Email"
//             value={data.email}
//             onChange={(e) =>
//               setData({ ...data, email: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={data.password}
//             onChange={(e) =>
//               setData({ ...data, password: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-gray-500 text-center">
//           Don’t have an account?{" "}
//           <span
//             className="text-amber-500 cursor-pointer hover:underline"
//             onClick={() => router.push("/register/company")}
//           >
//             Register
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../../app/assets/animation2.json"

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const { status, data: session } = useSession();

  console.log("🔥 [LOGIN PAGE] status:", status);
  console.log("🔥 [LOGIN PAGE] session:", session);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- 🔁 SESSION REDIRECT ---------------- */

 useEffect(() => {
  console.log("🧠 LOGIN useEffect triggered");

  if (status === "loading") return;

  if (status === "authenticated") {
    if (window.location.pathname !== "/home/company") {
      console.log("✅ Redirecting safely...");
      router.replace("/home/company");
    }
  }

}, [status, router]);

  /* ---------------- 🚀 LOGIN HANDLER ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🚀 Login attempt started");
    console.log("📧 Email:", data.email);

    setLoading(true);

    const res = await signIn("company-credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log("📡 signIn response:", res);

    setLoading(false);

    if (res?.ok) {
      console.log("✅ signIn success");

    

    } else {
      console.log("❌ signIn failed:", res?.error);
      alert("Invalid email or password");
    }
  };

  /* ---------------- ⏳ LOADING SCREEN ---------------- */

  if (status === "loading") {
    console.log("⏳ Rendering loading UI...");
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checking session...
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 via-white to-amber-50">

      {/* LEFT SIDE ANIMATION */}
      <div className="hidden md:flex flex-1 items-center justify-center relative">

        <div className="absolute w-[500px] h-[500px] bg-orange-400 blur-[140px] opacity-20 rounded-full" />

        <div className="w-[400px] h-[400px]">
          <Lottie animationData={animationData} loop />
        </div>

      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="flex flex-1 items-center justify-center px-6">

        <div className="bg-white/80 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-100">

          <h1 className="text-3xl font-black text-gray-900">
            Company <span className="text-orange-500">Login</span>
          </h1>

          <p className="mt-2 text-gray-600">
            Login to manage your company account
          </p>

          {error && (
            <p className="mt-3 text-sm text-red-500">
              Login failed. Please try again.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <input
              type="email"
              placeholder="Company Email"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-orange-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              className="w-full px-4 py-3 border border-orange-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Don’t have an account?{" "}
            <span
              className="text-orange-500 cursor-pointer hover:underline"
              onClick={() => router.push("/register/company")}
            >
              Register
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}