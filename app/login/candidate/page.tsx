import { Suspense } from "react";
import CandidateLoginPage from "./CandidateLoginPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <CandidateLoginPage />
    </Suspense>
  );
}