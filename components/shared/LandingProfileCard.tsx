import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LandingProfileCard = ({
  details,
}: {
  details: {
    image: string;
    name: string;
    username: string;
    description?: string;
    location?: string;
    isVerified?: boolean; 
  };
}) => {
  const router = useRouter();

  return (
    <div className="profile-card flex-1 w-full relative">
      <div className="absolute top-[-50px] flex justify-center w-full rounded-md">
        <Image
          src={details.image}
          alt="Profile Image"
          width={150}
          height={150}
          className="rounded-md lg:w-[120px] lg:h-[150px] xl:w-[150px] xl:h-[150px] w-[150px] h-[150px]"
        />
      </div>
      <div className="mt-12 rounded-md text-center w-full px-3">
        <h4 className="text-lg xl:text-xl font-semibold text-[#F5BFB0]">
          {details.name}
        </h4>
        <div className="text-[#F5BFB0] flex items-center justify-center gap-2">
          <p>{details.username}</p>
          {/* Conditionally render check image if the host is verified */}
          {details.isVerified && (
            <Image
              src="/assets/icons/check.png"
              alt="Verified"
              width={16}
              height={16}
            />
          )}
        </div>
        <p className="text-[#F5BFB0]">{details.location}</p>
        <p className="text-[#F5BFB0] mb-4 text-ellipsis line-clamp-2">
          {details.description}
        </p>

        <Button
          className="secondary-button gap-2 items-center w-full"
          onClick={() => {
            router.push(`/${details.username.slice(1)}`);
          }}
        >
          Book Meeting
          <Image
            alt="Right Arrow"
            src="/assets/icons/rightArrow.svg"
            width={16}
            height={16}
          />
        </Button>
      </div>
    </div>
  );
};

export default LandingProfileCard;
