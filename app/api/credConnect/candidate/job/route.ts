
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { connectDB } from "@/lib/db";
// import requestmodel from "@/model/requestmodel";
// import { Types } from "mongoose";

// export async function POST(req: Request) {
//   try {
//     console.log("hit route...");

//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();
//     const { connectId, companyId, connectType, message } = body;

//     if (!companyId || !connectType || !connectId) {
//       return NextResponse.json(
//         { message: "Required fields missing" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const candidateId = new Types.ObjectId(session.user.id);
//     const companyObjectId = new Types.ObjectId(companyId);
//     const jobObjectId = new Types.ObjectId(connectId);

//     /**
//      * ✅ Duplicate check (UX level)
//      * Remove status filter → block forever
//      */
//     const existingRequest = await requestmodel.findOne({
//       "sender.id": candidateId,
//       connect_Id: jobObjectId,
//       connectModel: connectType,
//     });

//     if (existingRequest) {
//       return NextResponse.json(
//         { message: "You already applied for this job" },
//         { status: 409 }
//       );
//     }

//     /**
//      * ✅ Create new request
//      */
//     const newRequest = await requestmodel.create({
//       sender: {
//         role: "Candidate",
//         id: candidateId,
//       },
//       receiver: {
//         role: "Company",
//         id: companyObjectId,
//       },
//       connectModel: connectType,
//       connect_Id: jobObjectId,
//       message,
//       status: "PENDING",
//     });

//     return NextResponse.json(
//       {
//         message: "Applied successfully",
//         request: newRequest,
//       },
//       { status: 201 }
//     );

//   } catch (error: any) {

//     console.error("REQUEST_CREATE_ERROR:", error);

//     /**
//      * 🔥 Important: Handle duplicate index error
//      */
//     if (error.code === 11000) {
//       return NextResponse.json(
//         { message: "You already applied for this job" },
//         { status: 409 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import requestmodel from "@/model/requestmodel";
import { Types } from "mongoose";

export async function POST(req: Request) {
  try {
    console.log("hit route...");

    // 1️⃣ Auth check
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Read body
    const body = await req.json();
    const { connectId, companyId, connectType, message } = body;

    if (!companyId || !connectType || !connectId) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    // 3️⃣ Connect DB
    await connectDB();

    const candidateId = new Types.ObjectId(session.user.id);
    const companyObjectId = new Types.ObjectId(companyId);
    const jobObjectId = new Types.ObjectId(connectId);

    /**
     * ✅ Duplicate check
     */
    const existingRequest = await requestmodel.findOne({
      "sender.id": candidateId,
      connect_Id: jobObjectId,
      connectModel: connectType,
    });

    if (existingRequest) {
      return NextResponse.json(
        { message: "You already applied for this job" },
        { status: 409 }
      );
    }

    /**
     * ✅ Create request
     */
    const newRequest = await requestmodel.create({
      sender: {
        role: "Candidate",
        id: candidateId,
      },
      receiver: {
        role: "Company",
        id: companyObjectId,
      },
      connectModel: connectType,
      connect_Id: jobObjectId,
      message,
      status: "PENDING",
    });

    /**
     * 🔔 Send notification to company (SAFE)
     * This will NOT break apply if it fails
     */
    try {
      await fetch("http://localhost:4000/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: companyId, // company gets notification
          title: "New Job Application",
          message: "A candidate applied for your job post",
         link: `/home/company?job=${connectId}&tab=job-posts`,
        }),
      });
    } catch (notifError) {
      console.error("Notification send failed:", notifError);
    }

    // 4️⃣ Return response
    return NextResponse.json(
      {
        message: "Applied successfully",
        request: newRequest,
      },
      { status: 201 }
    );

  } catch (error: any) {

    console.error("REQUEST_CREATE_ERROR:", error);

    /**
     * 🔥 Duplicate index error
     */
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "You already applied for this job" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}