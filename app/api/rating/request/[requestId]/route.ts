import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { RatingRequest } from "@/model/RaingRequest";

export async function GET(
  req: Request,
  context: { params: Promise<{ requestId: string }> }
) {

  await connectDB();

  const { requestId } = await context.params;

  const request = await RatingRequest.findById(requestId);

  if (!request) {
    return NextResponse.json(
      { message: "Rating request not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(request);

}