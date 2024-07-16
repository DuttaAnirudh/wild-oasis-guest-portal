import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function CabinSection({ cabins }) {
  const cabinsData = cabins.slice(0, 4);

  return (
    <section className="h-screen flex flex-col items-center gap-4">
      {/* HEADINGS */}
      <div className="grid grid-rows-3 grid-cols-2 gap-x-6 w-full">
        <h4 className="col-span-full text-xl font-extralight text-gray-200">
          Best Location
        </h4>
        <h2 className="row-start-2 row-end-3 text-accent-500 text-4xl font-semibold uppercase tracking-wider">
          Luxurious Cabins
        </h2>
        <p className="row-span-2 justify-self-end text-xl font-extralight text-gray-200 max-w-[28rem]">
          Extraordinary natural beauty, enjoy the rich culture and experience
          the frienliness of the local people.
        </p>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-5 grid-rows-2 gap-6 w-full">
        {cabinsData.map((cabin, i) => (
          <Link
            href={`/cabins/${cabin.id}`}
            className={`w-full relative ${
              i === 0 || i === 3 ? "col-span-3" : "col-span-2"
            }`}
            key={cabin.name}
          >
            <div
              className="relative w-full h-[19rem] rounded-[1.5rem] 
          overflow-hidden shadow-md shadow-accent-500/50 brightness-[0.85]"
            >
              <Image
                src={cabin.image}
                fill
                alt={`Cabin ${cabin.name}`}
                className="object-cover border-r border-primary-800"
              />
            </div>
            <p className="absolute bottom-4 left-0 text-xl px-8 py-2 bg-primary-50/10 backdrop-blur-lg rounded-r-[2rem] overflow-hidden w-[40%]">{`CABIN ${cabin.name}`}</p>
          </Link>
        ))}
      </div>
      {/* BUTTON */}
      <Link
        href="/cabins"
        className="mt-8  px-12 py-3 border border-accent-500
          text-accent-300 text-lg uppercase tracking-widest rounded-[2rem]
          font-semibold group hover:bg-accent-400 hover:text-primary-900 
          active:translate-y-1 transition-all duration-300 flex items-start justify-center gap-3"
      >
        See more
        <span className="w-6 h-6 group-hover:translate-x-4 group-hover:scale-[1.2] transition-all duration-100">
          <ArrowRightCircleIcon />
        </span>
      </Link>
    </section>
  );
}
