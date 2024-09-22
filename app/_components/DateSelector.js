"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "@/app/_context/ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ cabin, settings, bookedDates }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { minBookingLength, maxBookingLength } = settings;

  const { range, setRange, resetRange } = useReservation();

  // Checking if the selected date is b/w an already booked date
  // If TRUE, unselect the selected date
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-5 sm:pt-8 md:pt-10 lg:pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-between px-8 py-2 sm:py-0 bg-accent-500 text-primary-800 min-h-[72px] mt-4 md:mt-0">
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-6">
          <p className="flex gap-2 items-center">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-1.5 py-0.5 sm:px-3 sm:py-1.5 text-2xl rounded-lg">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total: </span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 px-2 py-1 lg:py-2 lg:px-4 ml-2 text-sm font-semibold rounded-lg"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
