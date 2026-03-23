import { NextRequest, NextResponse } from "next/server";
import companymodel from "@/model/companymodel";
import jobmodel from "@/model/jobmodel";
import {connectDB} from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import candidatemodel from "@/model/candidatemodel";


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // 1. Get candidate (you must have this model)
    const candidate = await candidatemodel.findOne({
      email: session.user.email,
    });

    if (!candidate) {
      return NextResponse.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }

    // 2. Find matching companies
    const companies = await companymodel
      .find({ companyType: candidate.stream, isBlocked: false, isVerified:true })
      .select("_id")
    
    console.log("companies ==========",companies)

    const companyIds = companies.map(c => c._id);

    // 3. Find jobs
    const jobs = await jobmodel
      .find({
        companyId: { $in: companyIds },
        isActive: true,
      })
      .populate("companyId","-password")
      .lean();

    return NextResponse.json(
      { success: true, jobs },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}