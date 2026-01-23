"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanyLogin() {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/company/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      console.log("Login successful");
      router.push("/dashboard/company");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-900">
          Company <span className="text-amber-500">Login</span>
        </h1>

        <p className="mt-2 text-gray-600">
          Login to manage your company profile
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Company Email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            type="submit"
            className="w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <span
            className="text-amber-500 cursor-pointer hover:underline"
            onClick={() => router.push("/register/company")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
