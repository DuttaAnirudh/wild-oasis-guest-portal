import { supabase } from "@/app/_lib/supabase";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(req) {
  const text = await req.text();
  const headersList = headers();
  const stripeSignature = headersList.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      text,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const { type, data } = event;

  try {
    switch (type) {
      case "payment_intent.succeeded":
        // Payment was successful
        const paymentIntent = data.object;

        await supabase
          .from("bookings")
          .update({ isPaid: true })
          .eq("paymentIntentId", paymentIntent.id);

        break;
      case "payment_intent.payment_failed":
        // Payment failed
        const failedIntent = data.object;

        await supabase
          .from("bookings")
          .delete()
          .eq("paymentIntentId", failedIntent.id);

        break;
      default:
        console.log(`Unhandled event type ${type}`);
    }
  } catch (error) {
    console.error("Error handling webhook event:", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
