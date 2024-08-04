import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function CabinSection({ cabins }) {
  const cabinsData = cabins.slice(0, 4);

  return (
    <section className="h-auto lg:h-screen flex flex-col items-center gap-4 px-4">
      {/* HEADINGS */}
      <div
        className="grid grid-rows-3 grid-cols-1 lg:grid-cols-2 items-center 
      justify-center gap-x-6 w-full"
      >
        <h4
          className="col-span-full justify-self-center lg:justify-self-start 
        text-xl font-extralight text-gray-200 underline underline-offset-4 decoration-1 
        decoration-accent-500 lg:no-underline"
        >
          Best Location
        </h4>
        <h2
          className="row-start-2 row-end-3 justify-self-center lg:justify-self-start 
        text-accent-500 text-4xl font-semibold uppercase tracking-wider text-center"
        >
          Luxurious Cabins
        </h2>
        <p
          className="row-span-2 text-lg md:text-xl font-extralight text-gray-200 max-w-[28rem] 
        justify-self-center lg:justify-self-end  text-center "
        >
          Extraordinary natural beauty, enjoy the rich culture and experience
          the friendliness of the local people.
        </p>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-4 md:grid-rows-2 gap-6 w-full">
        {cabinsData.map((cabin, i) => (
          <div
            className={`w-full relative ${
              i === 0 || i === 3 ? "md:col-span-3" : "md:col-span-2"
            }`}
            key={cabin.name}
          >
            <div
              className="relative w-full h-[13rem] sm:h-[15rem] md:h-[16.5rem] lg:h-[19rem] rounded-[1.5rem] 
          overflow-hidden shadow-md shadow-accent-500/50 brightness-[0.85]"
            >
              <Image
                src={cabin.image}
                fill
                alt={`Cabin ${cabin.name}`}
                className="object-cover border-r border-primary-800"
              />
            </div>
            <p
              className="absolute bottom-8 left-0 font-semibold text-sm sm:text-base md:text-xl 
            text-accent-800 px-8 py-2 bg-primary-50 rounded-r-[2rem]
             overflow-hidden max-w-[12rem] lg:max-w-[15rem]"
            >{`CABIN ${cabin.name}`}</p>
            <Link
              href={`/cabins/${cabin.id}`}
              className="absolute top-4 right-6 bg-primary-50 
              text-accent-800 text-xl p-2 rounded-full 
              hover:bg-accent-500 hover:text-primary-50 active:translate-x-1 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <Link
        href="/cabins"
        className="mt-4 md:mt-8 px-6 sm:px-8 md:px-10 lg:px-12 py-1.5 sm:py-2 md:py-3 border border-accent-500
          text-accent-300 text-sm sm:text-base md:text-lg uppercase tracking-widest rounded-[2rem]
          font-semibold group hover:bg-accent-400 hover:text-primary-900 
          active:translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
      >
        See more
        <span
          className="w-5 md:w-6 h-5 md:h-6 group-hover:translate-x-2 sm:group-hover:translate-x-3 
        md:group-hover:translate-x-4 group-hover:scale-[1.2] transition-all duration-100 -mt-1"
        >
          <ArrowRightCircleIcon />
        </span>
      </Link>
    </section>
  );
}
