import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import requestmodel from "@/model/requestmodel";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    console.log(session,9999999999999999999999)

    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get("candidateId");

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Candidate ID required" },
        { status: 400 }
      );
    }


    // Convert string → ObjectId
    const objectId = new mongoose.Types.ObjectId(session.user.id);
    

    // ✅ Correct Query Based On Your Schema
    const requests = await requestmodel.find({
      "sender.role": "Candidate",
      "sender.id": objectId,
      status: "ACCEPTED",
    })
    .populate("receiver.id"); // populate company
    console.log(requests,888)

    // Extract companies
    const companies = requests.map((r) => r.receiver.id);

    return NextResponse.json({
      success: true,
      companies,
    });

  } catch (err) {
    console.error("Accepted Companies API Error:", err);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}