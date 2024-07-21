import Link from "next/link";
import { auth } from "../_lib/auth";

export default function Navigation() {
  return (
    <nav className="z-10 text-xl bg-primary-50/15 backdrop-blur-lg px-12 py-1.5 rounded-full border border-primary-50/20">
      <ul className="flex gap-20 items-center">
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors  text-lg"
          >
            About
          </Link>
        </li>

        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors  text-lg"
          >
            Cabins
          </Link>
        </li>

        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors  text-lg"
          >
            Guest area
          </Link>
        </li>

        <li>
          <Link
            href="/#contact"
            className="hover:text-accent-400 transition-colors  text-lg"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
