import Image from "next/image";
import Link from "next/link";
import queenstownImg from "@/public/queenstown.jpg";

export default function CtaHomepage() {
  return (
    <section className="h-screen flex flex-col items-center justify-center w-full my-16">
      <div className="h-[90vh] flex items-center justify-center w-full">
        <div className="flex-1 w-full h-full relative">
          <div className="relative w-full h-full brightness-90 z-1">
            <Image
              className="object-cover object-center"
              src={queenstownImg}
              fill
              alt="Queenstown Image"
            />
          </div>

          <h2
            className="absolute top-0 left-0 z-2 max-w-[55rem] text-3xl 
          uppercase text-primary-50 font-medium bg-primary-950 p-6 
          rounded-br-full border-b border-r border-accent-300"
          >
            Explore Queenstown with Wild Oasis: Your gateway to unforgettable
            journeys, where{" "}
            <span className="text-accent-500 font-bold">
              every destination tells a unique story of adventure and discovery.{" "}
            </span>{" "}
          </h2>

          <h3
            className="absolute bottom-0 left-0 z-2 text-8xl text-accent-300 uppercase
           font-extrabold bg-primary-950 pt-16 pr-16 pl-6 pb-6 
           rounded-tr-full overflow-hidden border-t border-r border-accent-300"
          >
            Ready <br /> to Start <br /> a travel ?
          </h3>

          <Link
            href="/cabins"
            className="absolute bottom-0 right-0 bg-primary-950 
            rounded-tl-[2rem] px-12 py-4 text-2xl text-accent-300 
            uppercase semibold  border-t border-l border-accent-300 
            hover:bg-accent-300 hover:text-primary-950 transition-all 
            duration-300"
          >
            Book Now!
          </Link>
        </div>
      </div>
    </section>
  );
}
