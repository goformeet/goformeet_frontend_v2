"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ServiceCardProps } from "@/types";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const ServiceCard = ({
  cardDetails,
  username,
}: {
  cardDetails: ServiceCardProps;
  username?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const servicename = cardDetails.name.toLocaleLowerCase().replaceAll(" ", "-");

  // Log the location to the console
  if (cardDetails.location) {
    console.log("pref Location:", cardDetails.location);
  }

  const renderPricing = (pricing: number) => {
    // If the price is 0, display "Book Now"
    return pricing === 0 ? "Book Now" : `Rs. ${pricing}`;
  };

  return (
    <Card className="bg-[rgb(252,235,230)]">
      <CardHeader>
        <CardTitle>{cardDetails.name}</CardTitle>
        <CardDescription>{cardDetails.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="line-clamp-3 max-h-[68px] mb-3">
        <p>{cardDetails.longDescription}</p>
      </CardContent>
      {username && (
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full justify-between p-2 h-fit"
            onClick={() => {
              router.push(`/${username}/${servicename}?meetingType=Online`);
            }}
          >
            <div className="flex flex-col gap-2">
              <span className="flex items-center justify-start gap-2">
                <CalendarIcon size={16} /> {cardDetails.duration} Minutes
              </span>
              <span>Online Meeting</span>
            </div>
            <span className="bg-white rounded-full py-2 px-4 text-black">
              {renderPricing(cardDetails.onlinePricing)}
            </span>
          </Button>
          {cardDetails.isOfflineAvailable && (
            <Button
              className="w-full justify-between p-2 h-fit"
              onClick={() => {
                router.push(`/${username}/${servicename}?meetingType=Offline`);
              }}
            >
              <div className="flex flex-col gap-2">
                <span className="flex items-center justify-start gap-2">
                  <CalendarIcon size={16} /> {cardDetails.duration} Minutes
                </span>
                <span>Offline Meeting / In Person</span>
              </div>
              <span className="bg-white rounded-full py-2 px-4 text-black">
                {renderPricing(cardDetails.offlinePricing)}
              </span>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ServiceCard;
