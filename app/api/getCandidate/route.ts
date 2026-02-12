
import { NextResponse } from "next/server";
import candidatemodel from "@/model/candidatemodel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request) {
  try {

    const candSession = await getServerSession(authOptions);
    
        if (!candSession?.user?.id) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }

        // ⚠️ TEMP: updating DB before payment (testing only)
        // TODO: move this to webhook for production
        const candidate = await candidatemodel.findById(candSession.user.id).select('-password')
        
    return NextResponse.json({data:candidate},{ status:200 });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { message: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
