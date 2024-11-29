import React from "react";
import WhyChooseCard from "./WhyChooseCard";
import { whyChooseGoformeet } from "@/constants";

const WhyChooseGoformeet = () => {
  return (
    <div className="custom-container py-20 why-choose-us">
      <h2 className="text-3xl lg:text-4xl xl:text-5xl text-center mb-8 font-bold">
        Why Choose <span className="text-[#E03300]"> Goformeet? </span>
      </h2>
      <div className="flex gap-10 flex-wrap px-3">
        {whyChooseGoformeet.map((content, index) => (
          <WhyChooseCard key={content.title} content={content} />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseGoformeet;
