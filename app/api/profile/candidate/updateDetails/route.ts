import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import Candidate from "@/model/candidatemodel";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function PATCH(req: NextRequest) {
  try {
    // 1️⃣ Auth
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 1️⃣ Parse Multipart Form Data
    const formData = await req.formData();

    // Extract the file and the JSON string
    const file = formData.get("resumeFile") as File | null;
    const profileDataRaw = formData.get("profileData") as string;
    const editData = profileDataRaw ? JSON.parse(profileDataRaw) : {};

    const updateData: Record<string, any> = {};

    // 2️⃣ Handle PDF Upload if file exists
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadToCloudinary = (): Promise<any> => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              format: "pdf",
              folder: "resumes",
              public_id: `resume_${session.user.id}_${Date.now()}`,
              access_mode: "public"
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });
      };

      const cloudinaryResult = await uploadToCloudinary();
      console.log('cr ========= ',cloudinaryResult)
      updateData.pdfUrl = cloudinaryResult.secure_url;
    }

    // 3️⃣ Map text fields to updateData
    if (editData.fullName) updateData.fullName = editData.fullName;
    if (editData.description) updateData.description = editData.description;
    if (editData.experience) updateData.experience = editData.experience;
    if (editData.qualification) updateData.qualification = editData.qualification;
    if (editData.skills) {
      updateData.skills = typeof editData.skills === "string"
        ? editData.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
        : editData.skills;
    }

    console.log('full udpate Data 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀= ',updateData)

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No valid fields to update" },
        { status: 400 }
      );
    }

    // 4️⃣ DB
    await connectDB();

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    console.log('updated-candidate ===========',updatedCandidate)

    if (!updatedCandidate) {
      return NextResponse.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }

    // 5️⃣ Success
    return NextResponse.json({
      message: "Profile updated successfully",
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
