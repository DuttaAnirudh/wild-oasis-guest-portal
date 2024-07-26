import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-20">
      <h4 className="text-3xl text-accent-500 underline underline-offset-4 decoration-1">
        Verify Yourself
      </h4>
      <p className="text-xl text-accent-300 w-[33rem] text-center">
        A Mail has been sent to your email id. Verify your self by clicking on
        the link in your mail and then you can login to your account from{" "}
        <Link href="/login" className="underline text-blue-400">
          here
        </Link>
        .
      </p>
    </div>
  );
}
