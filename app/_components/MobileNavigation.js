"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/public/logo.png";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mobNavLinks } from "../_lib/constants";

function MobileNavigation() {
  const [openSheet, setOpenSheet] = useState(false);
  const pathName = usePathname();

  return (
    <section className="lg:hidden">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger className="h-7 w-7 mt-2">
          <Bars3Icon />
        </SheetTrigger>
        <SheetContent className="bg-primary-800 border-none">
          {/* LOGO */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 z-10">
            <div className="relative h-6 md:h-8 lg:h-10 w-6 md:w-8 lg:w-10">
              <Image
                src={logo}
                fill
                className="object-cover"
                quality={100}
                alt="The Wild Oasis logo"
              />
            </div>
            <span className="text-lg font-semibold text-accent-500 uppercase pt-1 sm:pt-1.5 md:pt-2">
              The Wild Oasis
            </span>
          </div>

          {/* NAVBAR */}
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto mt-8">
            <SheetClose>
              <section className="flex flex-col h-full gap-6 pt-6 text-accent-200 text-lg">
                {mobNavLinks.map((item) => (
                  <SheetClose key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setOpenSheet(false)}
                      className={`${
                        pathName === item.href && pathName.startsWith(item.href)
                          ? "text-accent-500 font-semibold uppercase underline underline-offset-4"
                          : ""
                      } hover:text-accent-400 transition-colors text-base xl:text-lg`}
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileNavigation;
