
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import companymodel from "@/model/companymodel";

export async function GET(req: Request) {
  try {

    const companySession = await getServerSession(authOptions);
    
        if (!companySession?.user?.id) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }

        // ⚠️ TEMP: updating DB before payment (testing only)
        // TODO: move this to webhook for production
        const company = await companymodel.findById(companySession.user.id).select('-password')
        
    return NextResponse.json({data:company},{ status:200 });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { message: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
