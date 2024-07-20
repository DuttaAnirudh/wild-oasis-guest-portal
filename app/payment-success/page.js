import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h3>Payment Successful</h3>
      <p>
        See your reseravtion{" "}
        <Link href="/account/reservations" className="underline text-blue-400">
          here
        </Link>
      </p>
    </div>
  );
}
