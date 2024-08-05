import Image from "next/image";
import Link from "next/link";
import queenstownImg from "@/public/queenstown.jpg";
import { caveat } from "../layout";

export default function CtaHomepage() {
  return (
    <section className="h-screen flex flex-col items-center justify-center w-full my-16">
      <div className="h-[90vh] flex items-center justify-center w-full">
        <div className="flex-1 w-full h-full relative flex flex-col items-center justify-center gap-8 lg:gap-0 lg:block">
          <div className="hidden lg:block relative w-full h-full brightness-90 z-1">
            <Image
              className="object-cover object-center"
              src={queenstownImg}
              fill
              alt="Queenstown Image"
            />
          </div>

          <h2
            className={`relative lg:absolute lg:top-0 lg:left-0 z-2 max-w-[55rem] text-xl sm:text-3xl 
          uppercase text-primary-50 font-medium bg-primary-950 p-6 
          rounded-br-full lg:border-b lg:border-r border-accent-300 ${caveat.className} text-center lg:text-left`}
          >
            Explore Queenstown with Wild Oasis: Your gateway to unforgettable
            journeys, where{" "}
            <span className="text-accent-500 font-bold">
              every destination tells a unique story of adventure and discovery.{" "}
            </span>{" "}
          </h2>

          <h3
            className="relative lg:absolute lg:bottom-0 lg:left-0 z-2 order-first text-4xl 
            sm:text-5xl md:text-7xl lg:text-8xl text-accent-300 uppercase
           font-extrabold bg-primary-950 lg:pt-16 lg:pr-16 lg:pl-6 lg:pb-6 text-center lg:text-left
           rounded-tr-full lg:overflow-hidden lg:border-t lg:border-r border-accent-300"
          >
            Ready <br /> to Start <br /> a travel ?
          </h3>

          <Link
            href="/cabins"
            className="relative lg:absolute lg:bottom-0 lg:right-0 bg-primary-950 
           max-[1024px]:rounded-sm lg:rounded-tl-[2rem] px-12 py-4 text-2xl text-accent-300 
            uppercase font-semibold underline underline-offset-8 decoration-amber-500 lg:no-underline 
            lg:border-t lg:border-l border-accent-300 max-[1024px]:active:bg-amber-900 max-[1024px]:active:text-primary-50
            lg:hover:bg-amber-900 lg:hover:text-amber-500 transition-all 
            lg:duration-300"
          >
            Book Now!
          </Link>
        </div>
      </div>
    </section>
  );
}
