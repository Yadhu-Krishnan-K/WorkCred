import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/model/jobmodel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

/* =====================
   GET SINGLE JOB
===================== */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    console.log('targetttttttttttttttttt')
    const { jobId } = await context.params; // ✅ FIX

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const job = await Job.findById(jobId);

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Fetch job error:", error);
    return NextResponse.json(
      { message: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

/* =====================
   UPDATE JOB
===================== */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params; // ✅ FIX

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    await connectDB();

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        role: body.role,
        experience: body.experience,
        requirements: body.requirements,
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Update job error:", error);
    return NextResponse.json(
      { message: "Failed to update job" },
      { status: 500 }
    );
  }
}
