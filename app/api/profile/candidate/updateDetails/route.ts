import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import Candidate from "@/model/candidatemodel";

export async function PATCH(req: NextRequest) {
  try {
    // 1️⃣ Auth
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Parse body
    const body = await req.json();

    const {
      fullName,
      description,
      experience,
      qualification,
      skills,
    } = body;

    // 3️⃣ Allowlist (very important)
    const updateData: Record<string, any> = {};

    if (typeof fullName === "string") updateData.fullName = fullName;
    if (typeof description === "string") updateData.description = description;
    if (typeof experience === "string") updateData.experience = experience;
    if (typeof qualification === "string") updateData.qualification = qualification;
    if (Array.isArray(skills)) updateData.skills = skills;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No valid fields to update" },
        { status: 400 }
      );
    }

    // 4️⃣ DB
    await connectDB();

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedCandidate) {
      return NextResponse.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }

    // 5️⃣ Success
    return NextResponse.json({
      message: "Profile updated successfully",
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
