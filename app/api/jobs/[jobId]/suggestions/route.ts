// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import jobmodel from "@/model/jobmodel";
// import candidatemodel from "@/model/candidatemodel";

// export async function GET(
//   req: Request,
//   context: { params: Promise<{ jobId: string }> }
// ) {

//   await connectDB();

//   const { jobId } = await context.params;

//   const job = await jobmodel.findById(jobId);

//   if (!job) {
//     return NextResponse.json(
//       { message: "Job not found" },
//       { status: 404 }
//     );
//   }

//   /* TEMPORARY TEST */

//   const candidates = await candidatemodel
//     .find()
//     .sort({ avgRating: -1 })
//     .limit(5);

//   console.log("Candidates found:", candidates);

//   return NextResponse.json(candidates);
// }
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import jobmodel from "@/model/jobmodel";
import candidatemodel from "@/model/candidatemodel";

export async function GET(
  req: Request,
  context: { params: Promise<{ jobId: string }> }
) {

  await connectDB();

  const { jobId } = await context.params;

  const job = await jobmodel.findById(jobId);

  if (!job) {
    return NextResponse.json(
      { message: "Job not found" },
      { status: 404 }
    );
  }

  const candidates = await candidatemodel
    .find({
      skills: { $exists: true, $ne: [] }
    })
    .sort({ avgRating: -1 })
    .limit(3);

  return NextResponse.json(candidates);

}