import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Request from "@/model/requestmodel";
import "@/model/candidatemodel"; // required for populate

export async function GET(
  _req: NextRequest,
  { params }: { params: { jobid: string } }
) {
  console.log("->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  try {
    // 1️⃣ Auth check first (fail fast)
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { jobid } = await params;

    // 2️⃣ DB connect
    await connectDB();

    // 3️⃣ Fetch applications
    const applications = await Request.find({
      connect_Id: jobid,
      connectModel: "JOB",
    })
      .populate({
        path: "sender.id",
        model: "Candidate",
        select:
          "fullName email profileImageUrl experience skills qualification avgRating",
      })
      .sort({ createdAt: -1 })
      .lean();

      console.log('applications......=>.....>>>>>>>>>>>>>>>>>>>>>',applications)
    // 4️⃣ remove deleted candidates
    const validApplications = applications.filter(
      (app) => app?.sender?.id
    );

    return NextResponse.json({
      success: true,
      count: validApplications.length,
      data: validApplications,
    });
  } catch (error: any) {
    console.error("Applications fetch failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve applications",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}
