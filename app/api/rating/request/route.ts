import { NextResponse } from "next/server";
import { RatingRequest } from "@/model/RaingRequest";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { receiverId, roomId, type } = body;

  const senderId = session.user.id;

  const request = await RatingRequest.create({
    senderId,
    receiverId,
    roomId,
    type
  });

  await fetch("http://localhost:4000/api/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      userId: receiverId,
      title: "Rating Request",
      message: "You received a rating request",
      link: `/rate/${request._id}`,
    }),
  });

  return NextResponse.json(request);
}