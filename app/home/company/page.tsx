import { Suspense } from "react";
import CompanyHomeUI from "./CompanyHomeUI";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <CompanyHomeUI />
    </Suspense>
  );
}