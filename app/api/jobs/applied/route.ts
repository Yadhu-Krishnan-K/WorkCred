import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import requestmodel from "@/model/requestmodel";
import { Types } from "mongoose";

export async function GET(req: Request) {
  try {
    console.log("hit route...");

    // 1️⃣ Auth check
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    const appliedJobRequests:any[] = await requestmodel.find({"sender.id":userId}).lean()

    // 4️⃣ Return response
    return NextResponse.json(
      {
        appliedJobRequests
      },
      { status: 200 }
    );

  } catch (error: any) {

    console.error("error finding jobs", error);

    /**
     * 🔥 Duplicate index error
     */
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "error finding jobs" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}