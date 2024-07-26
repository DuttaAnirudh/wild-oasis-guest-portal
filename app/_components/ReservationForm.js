"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "../_context/ReservationContext";
import { createBooking } from "../_lib/actions";
import ButtonForm from "./ButtonForm";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const extrasPrice = 0; // TEST

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
    extrasPrice,
    totalPrice: cabinPrice + extrasPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-center items-center gap-2">
        <p>Logged in as</p>

        <p className="text-accent-500 underline decoration-1 underline-offset-2">
          {user}
        </p>
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!startDate && !endDate ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <ButtonForm>Reserve now</ButtonForm>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
