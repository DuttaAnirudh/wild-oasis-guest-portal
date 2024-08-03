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

      <div className="relative z-10 text-center flex flex-col items-center gap-8 pt-[4rem]">
        <h2 className={`${caveat.className} antialiased text-7xl font-bold`}>
          Explore Paradise in
        </h2>
        <h1
          className="text-9xl text-accent-600 tracking-wider  z-10
        font-extrabold relative mb-24 "
        >
          THE WILD OASIS
          <span
            className="rotate-x absolute bottom-6 left-0 origin-bottom 
          text-9xl z-10 bg-gradient-to-t from-accent-600 to-transparent 
          bg-clip-text text-transparent opacity-60  "
          >
            THE WILD OASIS
          </span>
        </h1>

        <Link
          href="/cabins"
          className={`${caveat.className} antialiased mt-20  bg-amber-900 px-12 py-3
          text-amber-400 text-3xl uppercase tracking-widest rounded-[2rem]
          font-extrabold shadow-sm shadow-purple-50/50 hover:-translate-y-1 active:translate-y-1 
          transition-all duration-300 flex items-center justify-center gap-3 group`}
        >
          Explore
          <span className="w-6 h-6 group-hover:translate-x-2 group-hover:scale-[1.2] transition-all duration-100">
            <ArrowRightCircleIcon />
          </span>
        </Link>

        <h2 className="text-2xl text-primary-50 mt-12 font-extralight max-w-[34rem]">
          Nestled in the heart of Queenstown, We offer a tranquil escape
          surrounded by nature&apos;s beauty.
        </h2>
      </div>
    </section>
  );
}
