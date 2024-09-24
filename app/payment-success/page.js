import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-20">
      <h4 className="text-2xl sm:text-3xl text-accent-500 underline underline-offset-4 decoration-1">
        Payment Successful
      </h4>
      <h4 className="text-3xl sm:text-5xl text-accent-200 mt-4 uppercase text-center">
        Congratulations! <br /> Your Cabin is Booked
      </h4>
      <p className="text-lg sm:text-xl text-accent-500">
        See your reseravtion{" "}
        <Link href="/account/reservations" className="underline text-blue-400">
          here
        </Link>
        .
      </p>
    </div>
  );
}
