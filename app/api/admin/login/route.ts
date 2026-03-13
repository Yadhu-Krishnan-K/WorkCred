// app/api/admin/login/route.ts
import { Admin } from "@/model/adminModel"; 
import { connectDB } from "@/lib/db"; 
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    // Here you would typically set a JWT cookie or use NextAuth
    return NextResponse.json({ message: "Welcome , Admin" });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}