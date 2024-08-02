import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-24 h-[90vh] w-full relative">
      <div className="flex items-center justify-center gap-24 w-full">
        {/* HEADING */}

        <div className="flex flex-col items-start justify-start flex-1 gap-2">
          <p className="text-lg font-light max-w-[29rem] mb-20">
            If you have questions, we have answers for you{" "}
            <Link
              href="/faqs"
              className="text-accent-500 underline underline-offset-4 decoration-1"
            >
              here
            </Link>
            . In case we don&apos;t, please feel free to reach out to us.
          </p>
          <p className="text-lg ml-2">say hi to the team</p>
          <h2 className="text-8xl text-accent-500 font-bold">Contact Us</h2>
        </div>

        {/* CONTACT INFORMATON */}
        <div className="flex flex-col items-start justify-between gap-16 flex-1 ">
          <div className="flex flex-col items-start font-light ">
            <h3 className="text-accent-500 font-normal text-xl">
              opening hours
            </h3>
            <p>Monday - Sunday</p>
            <p>9:00 A.M to 11:00 P.M (NZST)</p>
          </div>
          <div className="flex flex-col items-start font-light">
            <h3 className="text-accent-500 font-normal text-xl">address</h3>
            <p>Wild Oasis</p>
            <p>123 Tranquility Lane</p>
            <p>Queenstown 9300</p>
            <p>New Zealand</p>
          </div>
          <div className="flex flex-col items-start font-light">
            <h3 className="text-accent-500 font-normal text-xl">support</h3>
            <a href="mailto:connect@wildoasis.travel">
              connect@wildoasis.travel
            </a>
            <p>(+64) 4444-4444</p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>

      {/* SOCIALS */}
      <div className="flex items-center justify-center gap-10 self-end text-accent-700 ">
        <Link
          href="https://www.facebook.com/"
          target="_blank"
          className="hover:underline decoration-1 underline-offset-4 transition-all"
        >
          facebook
        </Link>
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          className="hover:underline decoration-1 underline-offset-4 transition-all"
        >
          instagram
        </Link>
        <Link
          href="https://x.com/home"
          target="_blank"
          className="hover:underline decoration-1 underline-offset-4 transition-all"
        >
          twitter
        </Link>
        <Link
          href="https://www.snapchat.com/"
          target="_blank"
          className="hover:underline decoration-1 underline-offset-4 transition-all"
        >
          snapchat
        </Link>
      </div>
    </div>
  );
}
