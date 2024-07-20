export async function POST(req) {
  const buf = await buffer(req);
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Update the Supabase database
    const { data, error } = await supabase
      .from("bookings")
      .update({ isPaid: true })
      .eq("email", "worktodutta@gmail.com");

    if (error) {
      console.error("Error updating database:", error);
      return new Response("Error updating database", { status: 500 });
    }

    console.log("Database updated successfully:", data);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
