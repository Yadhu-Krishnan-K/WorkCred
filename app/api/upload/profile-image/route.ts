import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {connectDB} from "@/lib/db";
import Candidate from "@/model/candidatemodel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "profiles" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    const candidate = await Candidate.findOneAndUpdate(
      { email: session.user.email },
      {
        profileImageUrl: uploadResult.secure_url,
        profileImagePublicId: uploadResult.public_id,
      },
      { new: true }
    ).select("-password");

    return NextResponse.json({
      message: "Profile image updated",
      imageUrl: candidate.profileImageUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}
