import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import candidatemodel from "@/model/candidatemodel";
import { headers } from "next/headers";

export async function POST(req: Request) {


    console.log('on touch webhook 🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒')
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    console.log('checkout session is completed...')
    const session = event.data.object as any;
    console.log('Session ===== ',session)
    const userId = session.metadata.userId;
    const category = session.metadata.category;

    await candidatemodel.findByIdAndUpdate(userId, {
      stream: category,
      paymentStatus: "SUCCESS",
    });
    console.log('candidate model updated')
  }

  return NextResponse.json({ received: true });
}