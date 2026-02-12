import { NextResponse } from "next/server";
import Message from "@/model/Message";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {

  await connectDB();

  const { searchParams } = new URL(req.url);

  const sender = searchParams.get("sender");
  const receiver = searchParams.get("receiver");

  const messages = await Message.find({
    $or: [
      { senderId: sender, receiverId: receiver },
      { senderId: receiver, receiverId: sender },
    ],
  }).sort({ createdAt: 1 });

  return NextResponse.json(messages);
}
