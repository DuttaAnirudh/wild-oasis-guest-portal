import Image from "next/image";
import { activities } from "@/app/_lib/constants";

export default function Activities() {
  return (
    <section
      className="h-screen flex flex-col items-center justify-center 
    gap-8 my-12"
    >
      <h3 className="text-4xl uppercase semibold text-center text-primary-50">
        What you can&apos;t do at your <br /> home,{" "}
        <span className="text-accent-500">can be done here</span>
      </h3>
      <p className="font-extralight text-primary-50">
        Nature Vibes in the{" "}
        <span
          className="bg-accent-500 text-primary-950 pt-2 pb-1 pl-2 pr-2.5
         rounded-2xl font-semibold ml-1"
        >
          Wild Oasis
        </span>
      </p>

      <div className="flex items-center justify-center gap-6 my-8 w-full">
        {activities.map((activity) => (
          <div className="relative w-full h-full group" key={activity.name}>
            {/* Image Container */}
            <div
              className="relative max-w-[25rem] h-[25rem] brightness-75 
            group-hover:grayscale group-hover:blur-[2px]"
            >
              <Image
                src={activity.image}
                fill
                className="object-cover object-center"
                alt={`${activity.name} image`}
              />
            </div>
            <h2 className="absolute bottom-4 left-4 uppercase text-3xl">
              {activity.name}
            </h2>
            <p
              className="absolute bottom-[6rem] left-4 w-[20rem] text-left 
            font-light text-xl text-primary-50 translate-y-2 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
            >
              {activity.tag}
            </p>
          </div>
        ))}
      </div>

      <h2
        className="font-medium text-2xl uppercase text-primary-50 
      text-center max-w-[30rem] tracking-widest mt-8"
      >
        Explore Queenstown and{" "}
        <span className="text-accent-500">Beyond...</span>
      </h2>
    </section>
  );
}
