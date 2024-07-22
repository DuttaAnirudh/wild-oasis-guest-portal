import { supabase } from "@/app/_lib/supabase";
import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20", // latest API version as of 07-2024
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
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
    res.status(500).send("Internal Server Error");
    return;
  }

  res.status(200).json({ received: true });
};

export default webhookHandler;
