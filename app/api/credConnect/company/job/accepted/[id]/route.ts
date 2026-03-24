import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Request from "@/model/requestmodel";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ FIX: Promise type
) {
  try {

    // 1️⃣ Auth check
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ FIX: Await params
    const { id } = await params;

    // 2️⃣ Connect DB
    await connectDB();

    // 3️⃣ Update status AND return updated document
    const application = await Request.findByIdAndUpdate(
      id,
      { status: "ACCEPTED" },
      { new: true } // return updated doc
    );

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    // 4️⃣ Get candidate ID safely
    const candidateId = application.sender?.id?.toString();

    // 🔔 Notify candidate (NON-BLOCKING)
    if (candidateId) {
      fetch("NEXT_PUBLIC_BACKEND_URL/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: candidateId,
          title: "Application Accepted 🎉",
          message: "Your job application has been accepted",
          link: "/home/candidate",
        }),
      }).catch((notifError) => {
        console.error("Candidate notification failed:", notifError);
      });
    }

    // 5️⃣ Success response
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error: any) {

    console.error("Application accept failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update application",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}