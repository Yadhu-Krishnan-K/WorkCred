import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  apiVersion: "2025-12-15.clover",
});

export default stripe;