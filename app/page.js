import Hero from "@/app/_components/Hero";
import CabinSection from "@/app/_components/CabinSection";
import { getCabins } from "./_lib/data-service";

export default async function Home() {
  const cabins = await getCabins();

  return (
    <div className="mt-24 ">
      {/* HERO SECTION */}
      <Hero />

      {/* CABINS SECTIONS displaying 4 cabins */}
      <CabinSection cabins={cabins} />

      {/* <div className="h-screen bg-red-500">AMENETIES SECTION</div>
      <div className="h-screen bg-red-900">ACTIVITIES SECTION</div>
      <div className="h-screen bg-yellow-700">BOOKING SECTION</div> */}
    </div>
  );
}
