"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubCurrency } from "@/app/_lib/utils";
import StripePage from "./StripePage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function Checkout({ amount }) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubCurrency(amount),
        currency: "usd",
      }}
    >
      <StripePage amount={amount} />
    </Elements>
  );
}

export default Checkout;
