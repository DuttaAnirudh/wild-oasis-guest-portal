import { convertToSubCurrency } from "@/app/_lib/utils";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

function StripePage({ amount, bookingId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState();
  const [paymentIntentId, setPaymentIntentId] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: convertToSubCurrency(amount),
            bookingId,
          }),
        });

        if (!response.ok) {
          console.log(response);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setErrorMessage("Error creating payment intent. Please try again.");
      }
    };

    if (amount && bookingId) {
      fetchPaymentIntent();
    }
  }, [amount, bookingId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      setIsLoading(false);
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
        return_url: `${window.location.origin}/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
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
        className={`mt-2 w-full py-2 bg-primary-50 text-accent-900 text-xl uppercase font-semibold ${
          !isLoading ? "hover:bg-accent-900 hover:text-primary-50" : ""
        } transition-all`}
        disabled={isLoading}
      >
        {!isLoading ? "Pay" : `Processing... `}
      </button>
    </form>
  );
}

export default StripePage;
