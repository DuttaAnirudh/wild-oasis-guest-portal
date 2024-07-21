"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { convertToSubCurrency } from "@/app/_lib/utils";
import ButtonForm from "./ButtonForm";
import Spinner from "./Spinner";

function StripePage({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        throw new Error("Error creating payment intent:", error);
      }
    };

    fetchPaymentIntent();
  }, [amount]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error
      // whe confirming the payment. Show the error to your customer
      // E.g: "Incomplete Payment Details"
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // The customer/user is redirected to `return_url`
    }
    setIsLoading(false);
  }

  if (!clientSecret || !stripe || !elements) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {errorMessage && <p>{errorMessage}</p>}
      <button
        type="submit"
        className={`mt-2 w-full py-2 bg-purple-50 text-accent-900 text-xl uppercase font-semibold ${
          !isLoading ? "hover:bg-accent-900 hover:text-primary-50" : ""
        } transition-all`}
        disabled={isloading}
      >
        {!isloading ? "Pay" : "Processing..."}
      </button>
    </form>
  );
}

export default StripePage;
