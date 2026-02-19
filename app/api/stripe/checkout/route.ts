
import { NextResponse } from "next/server";
import  stripe  from "@/lib/stripe";
import candidatemodel from "@/model/candidatemodel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  console.log('===================================================++++>>>>>>>>>>>>>>>>>>>>>>> reached route')
  try {
  console.log('===================================================++++>>>>>>>>>>>>>>>>>>>>>>> reached route')

    const { category } = await req.json();

    const candSession = await getServerSession(authOptions);
    
        if (!candSession?.user?.id) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }

        // ⚠️ TEMP: updating DB before payment (testing only)
        // TODO: move this to webhook for production
        await candidatemodel.findByIdAndUpdate(candSession.user.id,{$set:{stream:category,paymentStatus:"SUCCESS"}})
        
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: `Enroll in ${category}`,
                },
                unit_amount: 5000, // ₹10 (Stripe uses paise)
              },
              quantity: 1,
            },
          ],
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
        });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { message: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
