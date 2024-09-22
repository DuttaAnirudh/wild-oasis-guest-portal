"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-6 w-6 lg:h-5 lg:w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: (
      <CalendarDaysIcon className="h-6 w-6 lg:h-5 lg:w-5 text-primary-600" />
    ),
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-6 w-6 lg:h-5 lg:w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-4 px-5 lg:py-3 lg:px-5 transition-colors flex items-center gap-4 font-semibold  
                ${
                  pathname === link.href
                    ? "bg-accent-500 rounded-lg text-primary-900"
                    : "text-primary-200 hover:bg-primary-900 hover:text-primary-100 "
                }`}
              href={link.href}
            >
              {link.icon}
              <span className="hidden lg:block">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto hidden lg:block">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
