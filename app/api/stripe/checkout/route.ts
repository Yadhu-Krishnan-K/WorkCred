// import { NextResponse } from "next/server";
// import  stripe  from "@/lib/stripe";

// export async function POST(req: Request) {
//   try {
//     const { category } = await req.json(); // IT, AGRICULTURE, etc.

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: `Enrollment: ${category}`,
//             },
//             unit_amount: 1000, // $10 demo price
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Stripe checkout failed" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import  stripe  from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { category } = await req.json();

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
