// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { redirect } from "next/navigation";
// import { connectDB } from "@/lib/db";
// import candidatemodel from "@/model/candidatemodel";
import CandidateUI from "./CandidateUI";

export default async function CandidateHomePage() {
  // const session = await getServerSession(authOptions);

  // Not logged in
  // if (!session || session.user.role !== "CANDIDATE") {
  //   redirect("/login/candidate");
  // }

  // await connectDB();

  // const candidate = await candidatemodel.findById(session.user.id);

  // Already enrolled
  // if (candidate?.paymentStatus === "SUCCESS") {
  //   redirect("/home/enrolled");
  // }

  return <CandidateUI />;
}
