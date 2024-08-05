import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-8 bg-primary-950 max-w-7xl mx-auto w-full flex flex-col gap-8 lg:gap-20 mt-[6rem] px-4 xl:px-0"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-0 ">
        <div className="flex-1 flex flex-col gap-5 items-center lg:items-start text-center lg:text-left">
          <h3 className="text-4xl md:text-6xl text-gray-500 capitalize">
            Let&apos;s connect with us
          </h3>
          <Link
            href="mailto:connect@wildoasis.travel"
            className="max-[400px]:text-2xl text-3xl md:text-5xl text-white "
          >
            connect@wildoasis.travel
          </Link>
        </div>

        {/* LINKs */}
        <div>
          <ul className="uppercase font-light underline flex flex-col gap-2 text-center lg:text-right">
            <li>
              <Link
                href="/about"
                className="hover:text-accent-500 transition-all duration-300"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="/cabins"
                className="hover:text-accent-500 transition-all duration-300"
              >
                Our Cabins
              </Link>
            </li>
            <li>
              <Link
                href="#activities"
                className="hover:text-accent-500 transition-all duration-300"
              >
                Activities
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className="hover:text-accent-500 transition-all duration-300"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="self-center lg:self-end">
        <ul className="flex flex-col items-end gap-2 font-light text-center lg:text-right">
          <li>Queenstown, Newzealand</li>
          <li>Phone: (+64) 4444-4444</li>
        </ul>
      </div>
    </footer>
  );
}
