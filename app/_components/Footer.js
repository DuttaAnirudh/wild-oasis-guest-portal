import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-8 bg-primary-950 max-w-7xl mx-auto w-full flex flex-col gap-20 mt-[6rem]"
    >
      <div className="flex items-start">
        <div className="flex-1 flex flex-col items-start gap-5">
          <h3 className="text-6xl text-gray-500 capitalize">
            Let&apos;s connect with us
          </h3>
          <Link
            href="mailto:connect@wildoasis.travel"
            className="text-5xl text-white "
          >
            connect@wildoasis.travel
          </Link>
        </div>
        <div>
          <ul className="texxt-xl uppercase font-light underline flex flex-col gap-2 text-right">
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
      <div className="self-end">
        <ul className="flex flex-col items-end gap-2 font-light text-right">
          <li>Queenstown, Newzealand</li>
          <li>Phone: (+64) 4444-4444</li>
        </ul>
      </div>
    </footer>
  );
}
