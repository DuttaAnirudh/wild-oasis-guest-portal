import Checkout from "@/app/_components/Checkout";
import { getBooking } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const booking = await getBooking(params.bookingId);
  const { totalPrice } = booking;

  return (
    <div className="py-12 w-full bg-accent-400 flex flex-col items-center justify-center">
      <h3 className="text-4xl text-primary-950 text-center">
        We request you to pay ${totalPrice}
      </h3>

      <Checkout amount={totalPrice} />
    </div>
  );
}
