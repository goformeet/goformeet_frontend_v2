"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BookMeeting = ({ username, serviceName }) => {
  const router = useRouter();
  return (
    <div>
      <Button
        className="secondary-button gap-2 items-center"
        onClick={() => {
          router.push(`/${username}/${serviceName.replaceAll(" ","-")}`);
        }}
      >
        Book Meeting{" "}
        <Image
          alt="Right Arrow"
          src="/assets/icons/rightArrow.svg"
          width={16}
          height={16}
        />
      </Button>
    </div>
  );
};

export default BookMeeting;
