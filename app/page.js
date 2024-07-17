import Hero from "@/app/_components/Hero";
import CabinSection from "@/app/_components/CabinSection";
import { getCabins } from "./_lib/data-service";
import Activities from "./_components/Activities";
import CtaHomepage from "./_components/CtaHomepage";

export default async function Home() {
  const cabins = await getCabins();

  return (
    <div className="mt-24 ">
      {/* HERO SECTION */}
      <Hero />

      {/* CABINS SECTIONS displaying 4 cabins */}
      <CabinSection cabins={cabins} />

      {/* ACTIVITIES SECTION */}
      <Activities />

      {/*CALL TO ACTION SECTION*/}
      <CtaHomepage />
    </div>
  );
}
