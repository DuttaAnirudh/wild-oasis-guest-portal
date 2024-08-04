import Image from "next/image";
import Link from "next/link";
import logo from "@/public/bg.png";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { caveat } from "../layout";

export default function Hero() {
  return (
    <section className="h-screen">
      <Image
        src={logo}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center flex flex-col items-center justify-start gap-8 pt-4 md:pt-16 lg:pt-[4rem]">
        <h2
          className={`${caveat.className} antialiased text-4xl min-[490px]:text-5xl sm:text-6xl md:text-7xl font-bold`}
        >
          Explore Paradise in
        </h2>

        {/* SMALL SCREEN HEADING */}
        <h1
          className="lg:hidden text-7xl sm:text-[5rem] md:text-[6rem] text-accent-600 tracking-wider z-10
        font-extrabold relative"
        >
          WILD OASIS
          <span
            className="rotate-x absolute bottom-6 left-0 origin-bottom 
          text-7xl md:text-[6rem] z-10 bg-gradient-to-t from-accent-600 to-transparent 
          bg-clip-text text-transparent opacity-60  "
          >
            WILD OASIS
          </span>
        </h1>

        {/* LARGE SCREEN HEADING */}
        <h1
          className="hidden lg:block text-[6.8rem] leading-none  xl:text-9xl text-accent-600 tracking-wider z-10
        font-extrabold relative"
        >
          THE WILD OASIS
          <span
            className="rotate-x absolute bottom-6 left-0 origin-bottom 
          text-[6.8rem] xl:text-9xl z-10 bg-gradient-to-t from-accent-600 to-transparent 
          bg-clip-text text-transparent opacity-60 2xl:opacity-40 "
          >
            THE WILD OASIS
          </span>
        </h1>
        <Link
          href="/cabins"
          className={`${caveat.className} antialiased mt-28 lg:mt-12 xl:mt-6  bg-amber-900 px-7 sm:px-8 md:px-10 lg:px-12 py-1 sm:py-1.5 md:py-2 lg:py-3
          text-amber-400 text-2xl lg:text-3xl uppercase tracking-widest rounded-[2rem]
          font-extrabold shadow-sm shadow-purple-50/50 hover:-translate-y-1 active:translate-y-1 
          transition-all duration-300 flex items-center justify-center gap-3 group z-10`}
        >
          Explore
          <span className="w-6 h-6 group-hover:translate-x-2 md:group-hover:scale-[1.2] transition-all duration-100">
            <ArrowRightCircleIcon />
          </span>
        </Link>

        <h2 className="text-lg sm:text-xl md:text-2xl px-2 text-primary-50 mt-4 sm:mt-6 md:mt-8 lg:mt-12 font-extralight max-w-[34rem] text-shodow-sm">
          Nestled in the heart of Queenstown, We offer a tranquil escape
          surrounded by nature&apos;s beauty.
        </h2>
      </div>
    </section>
  );
}
