"use client";

export default function CandidateRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-900">
          Register as <span className="text-blue-500">Candidate</span>
        </h1>

        <p className="mt-2 text-gray-600">
          Build your profile, get rated, and grow your career.
        </p>

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Register Candidate
          </button>
        </form>
      </div>
    </div>
  );
}
