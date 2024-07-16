import Image from "next/image";
import Link from "next/link";
import logo from "@/public/bg.png";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

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
        <h1
          className="text-8xl text-primary-50 mb-4 tracking-tight 
        font-normal"
        >
          Welcome to{" "}
          <span
            className="text-accent-500 bg-primary-950/20 
          backdrop-blur-2xl pt-4 px-4 rounded-2xl underline decoration-2 decoration-wavy decoration-primary-50 underline-offset-8"
          >
            Paradise
          </span>
        </h1>
        <h2 className="text-2xl text-primary-50">
          Your Serene Escape in NewZealand
        </h2>
        <Link
          href="/cabins"
          className="mt-20 bg-accent-800/5 backdrop-blur-sm px-16 py-4 
          text-accent-300 text-xl uppercase tracking-widest rounded-[2rem]
          font-semibold group hover:bg-accent-400 hover:text-primary-900 
          hover:backdrop-blur-none hover:-translate-y-1 active:translate-y-1 
          transition-all duration-300 flex items-start justify-center gap-3"
        >
          Explore
          <span className="w-6 h-6 group-hover:translate-x-4 group-hover:scale-[1.2] transition-all duration-100">
            <ArrowRightCircleIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}
