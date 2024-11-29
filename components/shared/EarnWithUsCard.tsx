import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const EarnWithUsCard = ({
  content,
}: {
  content: { title: string; icon: string; className: string };
}) => {
  return (
    <Card className={`bg-[#FCEBE6] lg:w-1/2 lg:max-w-[300px] rounded-md mt-16 ${content.className}`}>
      <CardHeader className="items-center">
        <div className="p-7 w-[120px] flex justify-center bg-[#E033000D] rounded-full">
          <Image src={content.icon} alt="Card Icon" width={56} height={56} />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-[#E03300] group-hover:text-white text-center mx-auto font-semibold text-xl xl:text-2xl mb-2">
          {content.title}
        </h3>
      </CardContent>
    </Card>
  );
};

export default EarnWithUsCard;
