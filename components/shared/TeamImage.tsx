import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Url } from "url";

interface personDetails {
  name: String;
  goformeet: any;
  designation: String;
  image?: string;
}

const TeamImage = ({ name, goformeet, designation, image }: personDetails) => {
  return (
    <Link href={goformeet}>
      <div className="team-photo-container">
        <div className="dp">
          <div className="wrapper">
            <div className="linkedin text-white z-10 flex items-center">
              <span className="mb-1">Meet via <span className="font-bold">goformeet</span></span>
            </div>
            {image && (
              <Image src={image} alt="person image" className="absolute top-[1px] left-[0px]" height={250} width={250} />
            )}
          </div>
        </div>
        <span className="name">{name}</span>
        <span>{designation}</span>
      </div>
    </Link>
  );
};

export default TeamImage;
