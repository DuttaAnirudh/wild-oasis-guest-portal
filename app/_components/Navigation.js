"use client";

import Link from "next/link";
import { navLinks } from "../_lib/constants";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block z-10 text-xl bg-primary-50/15 backdrop-blur-lg px-8 xl:px-12 py-1.5 rounded-2xl border border-primary-50/20">
      <ul className="flex gap-10 xl:gap-20 items-center">
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`${
                pathname.startsWith(item.href)
                  ? "text-accent-500 font-semibold uppercase underline underline-offset-4"
                  : ""
              } hover:text-accent-400 transition-colors text-base xl:text-lg`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
