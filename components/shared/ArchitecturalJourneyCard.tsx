import React from "react";

const ArchitecturalJourneyCard = ({
  content,
}: {
  content: { title: string; highlightedText: string; description: string };
}) => {
  return (
    <div className="lg:w-1/2 my-5">
      <h1 className="text-xl">
       <span className="text-[#E03300] font-bold"> {content.highlightedText} </span> {content.title}
      </h1>
      <p className="lg:w-[65%]">
        {content.description}
      </p>
    </div>
  );
};

export default ArchitecturalJourneyCard;
