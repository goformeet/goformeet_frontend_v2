import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

const WhyChooseCard = ({
  content,
}: {
  content: { title: string; description: string; icon: string };
}) => {
  return (
    <Card className="group focus:bg-[rgb(224,51,0)] hover:bg-[#E03300] hover:text-white bg-[#E0330005] border-0 lg:flex-1 w-full md:w-[45%] lg:w-[230px] hover:cursor-pointer">
      <CardHeader className="items-center">
        <div className="p-5 w-[80px] flex justify-center bg-[#FCEBE6] rounded-full">
          <Image src={content.icon} alt="Icon" width={50} height={50} />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="xl:w-1/2 text-[#E03300] group-hover:text-white text-center mx-auto font-semibold text-lg mb-2">
          {content.title}
        </h3>
        <p className="text-center mx-auto group-hover:text-[#FCEBE6]">
          {content.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default WhyChooseCard;
