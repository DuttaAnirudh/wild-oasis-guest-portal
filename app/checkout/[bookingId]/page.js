import Checkout from "@/app/_components/Checkout";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import Image from "next/image";

export default async function Page({ params }) {
  const booking = await getBooking(params.bookingId);
  const { totalPrice, cabinId } = booking;

  const cabin = await getCabin(cabinId);

  return (
    <div className=" w-full  flex items-center justify-center max-w-[80%] mx-auto rounded-l-[3rem] overflow-hidden mt-20 gap-8">
      <div className="relative w-full h-[45vh] flex-1">
        <Image
          src={cabin.image}
          fill
          className="object-cover object-center"
          alt={`Cabin ${cabin.name} image`}
        />
      </div>

      <div className="flex-1 px-8 py-6 bg-accent-600 rounded-2xl">
        <Checkout amount={totalPrice} bookingId={params.bookingId} />
      </div>
    </div>
  );
}
