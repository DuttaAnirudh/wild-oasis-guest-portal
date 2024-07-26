import { supabase } from "@/app/_lib/supabase/supabaseClient";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  try {
    const { amount, bookingId } = await request.json();

    if (!amount || !bookingId) {
      return NextResponse.json(
        { error: "Missing amount or bookingId in request body" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // Update booking with paymentIntentId
    const { error } = await supabase
      .from("bookings")
      .update({ paymentIntentId: paymentIntent.id })
      .eq("id", bookingId);

    if (error) {
      console.error(error);
      throw new Error("Unable update paymentIntentId in Database");
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
