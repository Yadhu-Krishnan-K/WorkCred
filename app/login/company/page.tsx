import { Suspense } from "react";
import CompanyLoginPage from "./CompanyLoginPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <CompanyLoginPage />
    </Suspense>
  );
}