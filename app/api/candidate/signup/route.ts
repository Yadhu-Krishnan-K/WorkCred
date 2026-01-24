import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import Candidate from "@/model/candidatemodel";

export async function POST(req: Request) {
  try {
    // 1️⃣ Connect to DB
    await connectDB();

    // 2️⃣ Get request body
    const { fullName, email, password } = await req.json();

    // 3️⃣ Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 4️⃣ Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return NextResponse.json(
        { message: "Candidate already exists" },
        { status: 409 }
      );
    }

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Create candidate
    await Candidate.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // 7️⃣ Success response
    return NextResponse.json(
      { message: "Candidate registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Candidate signup error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
