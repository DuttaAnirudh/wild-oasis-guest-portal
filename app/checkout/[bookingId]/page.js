import Checkout from "@/app/_components/Checkout";
import CheckoutBookingDetails from "@/app/_components/CheckoutBookingDetails";
import useSupabaseUser from "@/app/_hooks/useSupabaseUser";
import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const booking = await getBooking(params.bookingId);
  const { totalPrice, cabinId, isPaid, guestId } = booking;

  const session = await auth();
  const { user } = await useSupabaseUser();

  if (!session && !user) {
    throw new Error("You need to login to access this page");
  }

  const userGuestId = session
    ? session.user.guestId
    : user.user_metadata.guestId;

  // If guestId of user does'nt matches the guestId from current booking
  // Throw An Error
  if (guestId !== userGuestId) {
    throw new Error("You are not authorised to access this booking");
  }

  // If the current booking has a payment
  // Prevent user from paying again by throw an error
  if (isPaid) {
    throw new Error(`You have already paid for this booking.`);
  }

  const cabin = await getCabin(cabinId);

  return (
    <div className=" w-full flex flex-col lg:flex-row items-center justify-center max-w-[90%] mx-auto mt-20 gap-8">
      <div className="flex-1 sellf-center lg:self-start">
        <CheckoutBookingDetails bookingData={booking} cabinData={cabin} />
      </div>

      <div className="flex-1 px-8 py-6 bg-accent-600 rounded-2xl ">
        <Checkout amount={totalPrice} bookingId={params.bookingId} />
      </div>
    </div>
  );
}
