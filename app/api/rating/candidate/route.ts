import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Rating } from "@/model/Rating";
import companymodel from "@/model/companymodel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const candidateId = session.user.id;

  try {

    const ratings = await Rating.find({
      receiverId: candidateId
    }).sort({ createdAt: -1 });

    const formatted = await Promise.all(

      ratings.map(async (r:any) => {

        const company = await companymodel  .findById(r.senderId);

        return {
          company: company?.companyName || "Company",
          rating: r.overallRating,
          comment: r.review,
          date: r.createdAt
        };

      })

    );

    return NextResponse.json({
      ratings: formatted
    });

  } catch (error) {

    console.error("Rating fetch error:", error);

    return NextResponse.json(
      { message: "Failed to fetch ratings" },
      { status: 500 }
    );

  }

}