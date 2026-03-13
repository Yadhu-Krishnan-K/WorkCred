// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { Rating } from "@/model/Rating";
// import { RatingRequest } from "@/model/RaingRequest";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// export async function POST(req: Request) {

//   await connectDB();

//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   const currentUserId = session.user.id;

//   const body = await req.json();

//   const {
//     requestId,
//     communication,
//     performance,
//     skills,
//     approach,
//     environment,
//     visibility,
//     review
//   } = body;

//   const request = await RatingRequest.findById(requestId);

//   if (!request) {
//     return NextResponse.json(
//       { message: "Rating request not found" },
//       { status: 404 }
//     );
//   }


//   if (
//     currentUserId !== request.senderId &&
//     currentUserId !== request.receiverId
//   ) {
//     return NextResponse.json(
//       { message: "You are not part of this request" },
//       { status: 403 }
//     );
//   }

  
//   let receiverId: string;

//   if (request.senderId === currentUserId) {
//     receiverId = request.receiverId;
//   } else {
//     receiverId = request.senderId;
//   }


//   if (receiverId === currentUserId) {
//     return NextResponse.json(
//       { message: "You cannot rate yourself" },
//       { status: 400 }
//     );
//   }

//   const existing = await Rating.findOne({
//     receiverId ,
    
//     senderId: currentUserId
//   });
//   console.log(existing,888)
//   console.log("appleeeee")

//   if (existing) {
//     console.log("yadhuu krishnan")
//     return NextResponse.json(
//       { message: "Rating already submitted" },
//       { status: 400 }
//     );
//   }

//   const values = [
//     communication,
//     performance,
//     skills,
//     approach,
//     environment,
//     visibility
//   ].filter(v => v !== undefined && v !== null && v !== 0);

//   let overallRating = 0;

//   if (values.length > 0) {
//     overallRating =
//       values.reduce((a, b) => a + b, 0) / values.length;
//   }

//   const rating = await Rating.create({
//     requestId,
//     senderId: currentUserId,
//     receiverId,
//     communication,
//     performance,
//     skills,
//     approach,
//     environment,
//     visibility,
//     overallRating,
//     review
//   });

//   return NextResponse.json(rating);

// }
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Rating } from "@/model/Rating";
import { RatingRequest } from "@/model/RaingRequest";
import candidatemodel from "@/model/candidatemodel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const currentUserId = session.user.id;

  const body = await req.json();

  const {
    requestId,
    communication,
    performance,
    skills,
    approach,
    environment,
    visibility,
    review
  } = body;

  const request = await RatingRequest.findById(requestId);

  if (!request) {
    return NextResponse.json(
      { message: "Rating request not found" },
      { status: 404 }
    );
  }

  if (
    currentUserId !== request.senderId &&
    currentUserId !== request.receiverId
  ) {
    return NextResponse.json(
      { message: "You are not part of this request" },
      { status: 403 }
    );
  }

  let receiverId: string;

  if (request.senderId === currentUserId) {
    receiverId = request.receiverId;
  } else {
    receiverId = request.senderId;
  }

  if (receiverId === currentUserId) {
    return NextResponse.json(
      { message: "You cannot rate yourself" },
      { status: 400 }
    );
  }

  const existing = await Rating.findOne({
    receiverId,
    senderId: currentUserId
  });

  console.log(existing, 888);
  console.log("appleeeee");

  if (existing) {
    console.log("yadhuu krishnan");
    return NextResponse.json(
      { message: "Rating already submitted" },
      { status: 400 }
    );
  }

  const values = [
    communication,
    performance,
    skills,
    approach,
    environment,
    visibility
  ].filter(v => v !== undefined && v !== null && v !== 0);

  let overallRating = 0;

  if (values.length > 0) {
    overallRating =
      values.reduce((a, b) => a + b, 0) / values.length;
  }

  const rating = await Rating.create({
    requestId,
    senderId: currentUserId,
    receiverId,
    communication,
    performance,
    skills,
    approach,
    environment,
    visibility,
    overallRating,
    review
  });

  /* -------------------------------
     CALCULATE NEW AVERAGE RATING
  --------------------------------*/

  const ratingData = await Rating.aggregate([
    {
      $match: {
        receiverId: receiverId
      }
    },
    {
      $group: {
        _id: "$receiverId",
        avgRating: { $avg: "$overallRating" }
      }
    }
  ]);

  const avgRating = ratingData[0]?.avgRating || 0;

  await candidatemodel.findByIdAndUpdate(receiverId, {
    avgRating: avgRating
  });

  /* ------------------------------- */

  return NextResponse.json(rating);

}