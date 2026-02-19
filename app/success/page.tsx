import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import candidatemodel from "@/model/candidatemodel";
import SuccessUI from "./SuccessUI"; 

export default async function SuccessPage() {
  const session = await getServerSession(authOptions);

  // Not logged in
  if (!session || session.user.role !== "CANDIDATE") {
    redirect("/login/candidate");
  }

  await connectDB();

  const candidate = await candidatemodel.findById(session.user.id);

  // Invalid access conditions
  if (
    !candidate ||
    candidate.paymentStatus !== "SUCCESS" ||
    candidate.successViewed
  ) {
    redirect("/home/candidate");
  }

  // Mark success page as used
  candidate.successViewed = true;
  await candidate.save();

  return <SuccessUI />;
}
