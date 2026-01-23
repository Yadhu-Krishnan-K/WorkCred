"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function CompanyRegister() {
  const router=useRouter()
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    type:""
  })

  const handlesubmit=async(e: React.FormEvent)=>{
    e.preventDefault();
    const res=await fetch("/api/company/signup",{method:"POST"
      ,headers:{
       "Content-Type":"application/json",
      },
      body:JSON.stringify(data)
    })
    const dataform=await res.json()
    if(dataform){
      router.push("/login/company")
      console.log("success")


    }
    



  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-900">
          Register as <span className="text-amber-500">Company</span>
        </h1>

        <p className="mt-2 text-gray-600">
          Create your company profile and start hiring trusted talent.
        </p>

        <form className="mt-6 space-y-4"
        onSubmit={handlesubmit}
        >
          {/* Company Name */}
          <input
            type="text"
            placeholder="Company Name"
            value={data.name}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            onChange={(e)=>setData({...data,name:e.target.value})}
          />

          {/* Company Email */}
          <input
            type="email"
            placeholder="Company Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            onChange={(e)=>setData({...data,email:e.target.value})}
          />
           <input
            type="text"
            placeholder="Company Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            onChange={(e)=>setData({...data,password:e.target.value})}
          />

          {/* Company Type Dropdown */}
          <select
            className="w-full px-4 py-2 border rounded-lg bg-white 
                       focus:outline-none focus:ring-2 focus:ring-amber-500"
                       onChange={(e)=>setData({...data,type:e.target.value})}
          >
            <option value="">Select Company Type</option>
            <option value="IT">IT</option>
            <option value="MEDICAL">Medical</option>
            <option value="AUTOMOBILE">Automobile</option>
            <option value="AGRICULTURE">Agriculture</option>
            <option value="HAND_CRAFTS">Hand Crafts</option>
            <option value="OTHERS">Others</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
}
