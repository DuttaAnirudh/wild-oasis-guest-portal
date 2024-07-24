import Checkout from "@/app/_components/Checkout";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import Image from "next/image";

export default async function Page({ params }) {
  const booking = await getBooking(params.bookingId);
  const { totalPrice, cabinId } = booking;

  const cabin = await getCabin(cabinId);

  return (
    <div className=" w-full bg-accent-600 flex items-center justify-center max-w-[80%] mx-auto rounded-l-[3rem] overflow-hidden mt-20">
      <div className="relative w-full h-[60vh] flex-1 ">
        <Image
          src={cabin.image}
          fill
          className="object-cover object-center"
          alt={`Cabin ${cabin.name} image`}
        />
      </div>

      <div className="flex-1 px-8">
        <Checkout amount={totalPrice} bookingId={params.bookingId} />
      </div>
    </div>
  );
}
