"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useError } from "@/app/ErrorContext";

export default function CandidateLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setError } = useError();

  const { data: session } = useSession();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle middleware errors (?error=blocked etc)
  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "blocked") {
      setError({ message: "Your account has been blocked by admin" });
    }

    if (error === "unauthorized") {
      setError({ message: "Please login first" });
    }

    if (error === "not_verified") {
      setError({ message: "You're account is not verified yet, please wait until admin verifies it" });
    }
  }, [searchParams, setError]);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (!session) return;

    if (session.user.role !== "CANDIDATE") return;

    if (session?.user?.stream) {
      router.replace("/home/enrolled");
    } else {
      router.replace("/home/candidate");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("candidate-credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    setLoading(false);

    // ✅ Use centralized error instead of alert
    if (!res?.ok) {
      setError({ message: "Invalid email or password" });
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-900">
          Candidate <span className="text-blue-500">Login</span>
        </h1>

        <p className="mt-2 text-gray-600">
          Login to access your candidate dashboard
        </p>

        {/* ❌ REMOVE this (handled globally now) */}
        {/* {error && <p className="text-red-500">...</p>} */}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Dont have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/register/candidate")}
          >
            Register
          </span>
        </p>
        <p className="text-center">--OR--</p>
        <div className="w-full flex justify-center items-center mt-5">
          <button
          onClick={()=>signIn("google")}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Sign in with Google
        </button>
        </div>
      </div>
    </div>
  );
}