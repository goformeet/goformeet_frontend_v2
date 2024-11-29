import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQQuestions } from "@/constants";

const FAQSection = () => {
  return (
    <div className="custom-container py-20 lg:h-screen flex flex-col justify-center architecture-journey">
      <div>
        <h2 className="font-bold text-center mb-4 text-3xl lg:text-4xl xl:text-5xl">
          <span className="text-[#E03300]">Frequently</span> Asked Questions
        </h2>
        <p className="mb-14 text-lg w-[80%] text-center mx-auto">
          Goformeet makes scheduling meetings effortless, fitting your comfort
          and time frame. Even if you&apos;re swamped, Goformeet&apos;s got your back!
        </p>
      </div>
      <Accordion className="w-3/4 mx-auto" type="single" collapsible>
        {FAQQuestions.map((question) => (
          <AccordionItem key={question.id} value={question.id}>
            <AccordionTrigger className="flex items-center justify-between py-5 border-b border-[#FBE0D9]">
              <h3 className="font-bold text-lg text-left">{question.question}</h3>
            </AccordionTrigger>
            <AccordionContent className="py-5">
              <p className="text-sm">{question.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
