import Image from "next/image";
import React from "react";
import ArchitecturalJourneyCard from "./ArchitecturalJourneyCard";
import { ArchitectureJourneyCards } from "@/constants";

const ArchitecturalJourney = () => {
  return (
    <div className="custom-container py-20 lg:flex items-center architecture-journey">
      <div className="flex-1 py-10">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl mb-8 font-bold">
          MEET, CONNECT AND{" "}
          <span className="text-[#E03300]">
            {" "}
            <br /> EARN
          </span>
        </h2>
        <p className="w-full lg:w-[80%]">
          Goformeet isn&apos;t just a meeting app; it&apos;s your gateway to new
          experiences, connections, and opportunities. Whether you&apos;re expanding
          your social circle, growing your professional network, or just having
          fun, Goformeet has it all. With offline meetings, a diverse user
          base, and exciting.
        </p>
        <div className="lg:flex flex-wrap">
          {ArchitectureJourneyCards.map((card, index) => (
            <ArchitecturalJourneyCard key={index} content={card} />
          ))}
        </div>
      </div>
      <div className="lg:w-[35%] xl:w-[45%] h-full">
        <Image
          alt="Architectural journey"
          src="/assets/images/architectureJounrey.png"
          className="w-full"
          width={400}
          height={200}
        />
      </div>
    </div>
  );
};

export default ArchitecturalJourney;
