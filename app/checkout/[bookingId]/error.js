"use client";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6 mt-20">
      <h1 className="text-2xl capitalize font-semibold underline underline-offset-2 decoration-1">
        Oops! There was an error
      </h1>
      <p className="text-3xl text-accent-400">{error.message}</p>

      <p className="text-lg">
        Feel free to{" "}
        <Link
          href="/contact"
          className="text-blue-400 underline underline-offset-2 capitalize"
        >
          contact us
        </Link>{" "}
        to resolve this issue.
      </p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 text-primary-800 
        px-5 py-1 text-lg rounded-lg"
      >
        Try again
      </button>
      <p>or</p>
      <p className="text-lg flex items-center gap-2">
        Go back to
        <Link href="/" className="text-accent-500 flex items-center gap-2 ">
          Homepage{" "}
          <span className="w-3 h-3">
            <ArrowRightIcon />
          </span>
        </Link>
      </p>
    </main>
  );
}
