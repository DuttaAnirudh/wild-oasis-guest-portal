"use client";

import Link from "next/link";
import { navLinks } from "../_lib/constants";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="z-10 text-xl bg-primary-50/15 backdrop-blur-lg px-12 py-1.5 rounded-2xl border border-primary-50/20">
      <ul className="flex gap-20 items-center">
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`${
                pathname.startsWith(item.href)
                  ? "text-accent-500 font-semibold uppercase underline underline-offset-4"
                  : ""
              } hover:text-accent-400 transition-colors  text-lg`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
