// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { connectDB } from "@/lib/db";
// import requestmodel from "@/model/requestmodel";
// import { Types } from "mongoose";

// export async function POST(req: Request) {
//   try {
//     console.log('hit route...')
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();
//     const { connectId, companyId, connectType, message } = body;

//     if (!companyId || !connectType) {
//       return NextResponse.json(
//         { message: "companyId and type are required" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     /**
//      * Prevent duplicate pending requests
//      */
//     const existingRequest = await requestmodel.findOne({
//       "sender.id": session.user.id,
//       "receiver.id": companyId,
//       connect_Id:connectId,
//       connectModel: connectType,
//       status: "PENDING",
//     });

//     if (existingRequest) {
//       return NextResponse.json(
//         { message: "Request already sent" },
//         { status: 409 }
//       );
//     }

//     const newRequest = await requestmodel.create({
//       sender: {
//         role: "Candidate",
//         id: new Types.ObjectId(session.user.id),
//       },
//       receiver: {
//         role: "Company",
//         id: new Types.ObjectId(companyId),
//       },
//       connectModel: connectType, // JOB | FREELANCE | INTERNSHIP
//       connect_Id:connectId,
//       message,
//       status: "PENDING",
//     });

//     console.log('created request successfully for job, data = ',newRequest)

//     return NextResponse.json(
//       {
//         message: "Request sent successfully",
//         request: newRequest,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("REQUEST_CREATE_ERROR:", error);
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

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { connectId, companyId, connectType, message } = body;

    if (!companyId || !connectType || !connectId) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    await connectDB();

    const candidateId = new Types.ObjectId(session.user.id);
    const companyObjectId = new Types.ObjectId(companyId);
    const jobObjectId = new Types.ObjectId(connectId);

    /**
     * ✅ Duplicate check (UX level)
     * Remove status filter → block forever
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
     * ✅ Create new request
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
     * 🔥 Important: Handle duplicate index error
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