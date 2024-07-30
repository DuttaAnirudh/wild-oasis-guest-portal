import { InvoiceTemplate } from "@/app/_components/InvoiceTemplate";
import { getCabin } from "@/app/_lib/data-service";
import { supabase } from "@/app/_lib/supabase/supabaseClient";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const endpointSecret =
  "whsec_2856656f4e0c8ed70acc0d84ef07e7baf753364fc4af1083cfcde1ff3dd83f61";

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(req) {
  const text = await req.text();

  const stripeSignature = req.headers.get("stripe-signature");

  let event;

  try {
    if (endpointSecret) {
      // Construct event using raw body and signature
      event = stripe.webhooks.constructEvent(
        text,
        stripeSignature,
        endpointSecret
      );
    } else {
      // If no endpoint secret, use the raw body
      event = JSON.parse(text);
    }
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  const { type, data } = event;

  try {
    switch (type) {
      case "payment_intent.succeeded":
        // Payment was successful
        await handlePaymentIntentSucceeded(data.object);

        break;
      case "payment_intent.payment_failed":
        // Payment has failed
        await handlePaymentIntentFailed(data.object);

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

// Function to handle payment_intent.succeeded event
async function handlePaymentIntentSucceeded(paymentIntent) {
  // Update the Supabase database and retrieve the updated booking
  const { data: bookingData, error: bookingDataError } = await supabase
    .from("bookings")
    .update({ isPaid: true })
    .eq("paymentIntentId", paymentIntent.id)
    .select()
    .single();

  if (bookingDataError) {
    throw new bookingDataError(
      `Error updating database: ${bookingDataError.message}`
    );
  }

  console.log("Database updated successfully:", bookingData);

  // Fetching Guest Info for Invoice
  const { data: guestData } = await supabase
    .from("guests")
    .select("*")
    .eq("id", bookingData.guestId)
    .single();

  // Fetching Booked Cabin Info for Invoice
  const cabinData = await getCabin(bookingData.cabinId);

  // Send invoice email
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: guestData.email,
    subject: "Cabin Booked!",
    react: (
      <InvoiceTemplate
        bookingData={bookingData}
        guestData={guestData}
        cabinData={cabinData}
      />
    ),
  });
}

// Function to handle payment_intent.payment_failed event
async function handlePaymentIntentFailed(failedIntent) {
  // Delete the booking from Supabase
  await supabase
    .from("bookings")
    .delete()
    .eq("paymentIntentId", failedIntent.id);
}
