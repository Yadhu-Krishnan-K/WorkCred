import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Request from "@/model/requestmodel";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    // 2️⃣ Get ID
    const { id } = await params;

    // 3️⃣ Connect DB
    await connectDB();

    // 4️⃣ Update status → REJECTED
    const application = await Request.findByIdAndUpdate(
      id,
      { status: "REJECTED" }, // ✅ IMPORTANT
      { new: true }
    );

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    // 5️⃣ Get candidate ID
    const candidateId = application.sender?.id?.toString();

    // 🔔 Notify candidate (NON-BLOCKING)
    if (candidateId) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: candidateId,
          title: "Application Rejected ❌",
          message: "Your job application has been rejected",
          link: "/home/candidate",
        }),
      }).catch((notifError) => {
        console.error("Candidate notification failed:", notifError);
      });
    }

    // 6️⃣ Response
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error: any) {

    console.error("Application reject failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to reject application",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}