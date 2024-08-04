"use client";

import Link from "next/link";
import { useState } from "react";
import Accordion from "./Accordion";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { faqsHomepage as faqs } from "@/app/_lib/constants";

function FAQHomepage() {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      {/* HEADING */}
      <div className=" flex flex-col items-center justify-start gap-2 uppercase max-[490px]:text-2xl text-3xl sm:text-4xl">
        <h2>
          You ask?{" "}
          <span className="underline underline-offset-8 decoration-2 decoration-accent-500">
            We answer.
          </span>{" "}
        </h2>
        <p>
          No{" "}
          <span className="line-through decoration-2 decoration-primary-50 text-accent-500">
            need to worry
          </span>
        </p>
      </div>

      {/* FAQ BOX */}
      <div className="flex flex-col items-center justify-center w-full">
        {faqs.map((item, i) => (
          <Accordion
            id={i}
            title={item.title}
            text={item.text}
            curOpen={curOpen}
            setCurOpen={setCurOpen}
            key={item.title}
          />
        ))}
      </div>

      <Link
        href="/faqs"
        className="mt-4 md:mt-8 px-6 sm:px-8 md:px-10 lg:px-12 py-1.5 sm:py-2 md:py-3 border border-accent-500
          text-accent-300 text-sm sm:text-base md:text-lg uppercase tracking-widest rounded-[2rem]
          font-semibold group hover:bg-accent-400 hover:text-primary-900 
          active:translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
      >
        More FAQs
        <span
          className="w-5 md:w-6 h-5 md:h-6 group-hover:translate-x-2 sm:group-hover:translate-x-3 
        md:group-hover:translate-x-4 group-hover:scale-[1.2] transition-all duration-100 -mt-1"
        >
          <ArrowRightCircleIcon />
        </span>
      </Link>
    </div>
  );
}

export default FAQHomepage;
