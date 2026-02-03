import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Request from "@/model/requestmodel";
import "@/model/candidatemodel"; // required for populate

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
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

    const { id } = await params;

    // 2️⃣ DB connect
    await connectDB();

    // 3️⃣ Fetch application
    const application = await Request.findByIdAndUpdate(id,{status:"ACCEPTED"})
      

      console.log('application......=>.....>>>>>>>>>>>>>>>>>>>>>',application)
    // 4️⃣ remove deleted candidates
    
    return NextResponse.json({
      success: true
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
