"use client";

import { useState } from "react";
import Accordion from "./Accordion";
import { faqsAll as faqs } from "@/app/_lib/constants";

function FAQpage() {
  const [curOpen, setCurOpen] = useState(null);
  return (
    //    FAQ BOX
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
  );
}

export default FAQpage;
