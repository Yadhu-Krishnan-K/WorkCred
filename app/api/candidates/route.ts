import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Candidate from "@/model/candidatemodel";

/**
 * GET /api/candidates
 */
export async function GET() {
  try {
    await connectDB();

    const candidates = await Candidate.find().lean();

    return NextResponse.json(
      { success: true, data: candidates },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}
