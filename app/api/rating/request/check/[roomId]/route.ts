import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { RatingRequest } from "@/model/RaingRequest";

export async function GET(
  req: Request,
  context: { params: Promise<{ roomId: string }> }
) {

  await connectDB();

  const { roomId } = await context.params;

  const request = await RatingRequest.findOne({
    roomId,
    status: "pending"
  });

  return NextResponse.json({
    exists: !!request
  });

}