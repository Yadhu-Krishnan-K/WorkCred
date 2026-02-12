// import stripe from "@/lib/stripe";
// import { NextResponse } from "next/server";
// import { headers } from "next/headers";

// export async function POST(req: Request) {
//   const body = await req.text();
//   const sig = headers().get("stripe-signature")!;

//   try {
//     const event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as any;

//       const category = session.metadata.category;

//       // ✅ THIS IS WHERE YOU:
//       // - enroll user
//       // - update DB
//       // - give access
//       // - mark paid
//       console.log("Payment success:", category);
//     }

//     return NextResponse.json({ received: true });
//   } catch (err) {
//     return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
//   }
// }
