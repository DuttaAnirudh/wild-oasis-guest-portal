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
      <div className=" flex flex-col items-center justify-start gap-2 uppercase text-4xl">
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
        className="mt-8  px-12 py-3 border border-accent-500
          text-accent-300 text-lg uppercase tracking-widest rounded-[2rem]
          font-semibold group hover:bg-accent-400 hover:text-primary-900 
          active:translate-y-1 transition-all duration-300 flex items-start justify-center gap-3"
      >
        More FAQs
        <span className="w-6 h-6 group-hover:translate-x-4 group-hover:scale-[1.2] transition-all duration-100">
          <ArrowRightCircleIcon />
        </span>
      </Link>
    </div>
  );
}

export default FAQHomepage;
