"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
export default function CandidateRegister() {
  const router=useRouter()
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

 const handlesubmit=async(e: React.FormEvent)=>{
    e.preventDefault();
    const res=await fetch("/api/candidate/signup",{method:"POST"
      ,headers:{
       "Content-Type":"application/json",
      },
      body:JSON.stringify(data)
    })
    const dataform=await res.json()
    if(dataform){
      router.push("/login/candidate")
      console.log("success")


    }
    



  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-900">
          Register as <span className="text-blue-500">Candidate</span>
        </h1>

        <p className="mt-2 text-gray-600">
          Create your account to get started.
        </p>

        <form onSubmit={handlesubmit} className="mt-6 space-y-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={data.fullName}
            onChange={(e) =>
              setData({ ...data, fullName: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Register Candidate
          </button>
        </form>
      </div>
    </div>
  );
}
