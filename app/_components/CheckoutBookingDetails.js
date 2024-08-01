import { format, parseISO } from "date-fns";
import Image from "next/image";

function CheckoutBookingDetails({ bookingData, cabinData }) {
  return (
    <div
      className="relative grid grid-cols-10 grid-rows-8 gap-y-2 h-[16rem] 
    justify-items-start shadow-sm shadow-accent-600 rounded-2xl 
    overflow-hidden px-3 py-6 font-light"
    >
      {/* Cabin Image */}
      <div
        className="relative  h-full w-full flex-1 row-start-1 
      row-end-4 col-span-2 rounded-2xl overflow-hidden"
      >
        <Image
          src={cabinData.image}
          fill
          className="object-cover object-center"
          alt={`Cabin ${cabinData.name} image`}
        />
      </div>

      {/* Cabin Name */}
      <h3
        className="row-[1/2] col-[3/6] ml-2 text-xl font-semibold 
      text-accent-500 uppercase "
      >
        Cabin {cabinData.name}
      </h3>

      <p className="row-[2/3] col-[3/8] ml-2">
        Cabin Price (for {bookingData.numGuests} Guests)
      </p>

      {/* Total Cabin Price */}
      <p
        className="row-[2/3] col-[9/11] justify-self-end mr-2 
      font-semibold tracking-wider"
      >
        ${bookingData.cabinPrice}
      </p>

      <p className="row-[3/4] col-[3/7] ml-2">
        Breakfast Included?{" "}
        <span
          className={`${
            bookingData.hasBreakfast
              ? "text-green-400"
              : "text-red-400 underline underline-offset-2"
          } pl-1 text-sm`}
        >
          {bookingData.hasBreakfast ? "YES" : "NO"}
        </span>
      </p>

      {/* Breakfast Price */}
      <p
        className="row-[3/4] col-[9/11] justify-self-end mr-2 
      font-semibold tracking-wider"
      >
        {bookingData.hasBreakfast ? `$${extrasPrice}` : "--"}
      </p>

      {/* Start Date */}
      <p className="row-[5/6] col-[1/7] ml-2 font-medium tracking-wider">
        <span className="font-extralight pr-2">From:</span>{" "}
        {format(parseISO(bookingData.startDate), "iii MMMMMM dd, yyyy")}
      </p>

      {/* End Date */}
      <p className="row-[6/7] col-[1/7] ml-2 font-medium tracking-wider">
        <span className="font-extralight pr-2">To:</span>{" "}
        {format(parseISO(bookingData.endDate), "iii MMMMMM dd, yyyy")}
      </p>

      <p
        className="row-[8/9] col-[7/9] font-semibold uppercase 
      text-accent-500 text-xl"
      >
        Total :
      </p>

      {/* Grand Total */}
      <p
        className="row-[8/9] col-[9/11] justify-self-end mr-2 
      font-semibold text-accent-500 text-xl tracking-wider"
      >
        ${bookingData.totalPrice}
      </p>

      {/* VERTICAL LINE */}
      <div className="absolute w-[1px] h-[9rem] bg-accent-300 right-[7rem] top-14">
        &nbsp;
      </div>

      {/* HORIZONTAL LINE */}
      <div className="absolute w-[94%] h-[1px] bg-accent-300 left-5 bottom-14">
        &nbsp;
      </div>
    </div>
  );
}

export default CheckoutBookingDetails;
