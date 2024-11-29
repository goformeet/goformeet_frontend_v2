import TeamImage from "@/components/shared/TeamImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Team = () => {
  // Declare image locations as constants
  const images = {
    saurav: "/assets/images/team/saurav.png",
    prashob: "/assets/images/team/prashob.png",
    shashank: "/assets/images/team/shashanks.png",
    abinesh: "/assets/images/team/abinesh.png",
    shwetha: "/assets/images/team/swetha.png",
    arijith: "/assets/images/team/arjiths.png",
    pranav: "/assets/images/team/pranav.png",
  };

  return (
    <div className="custom-container py-10">
      <h3 className="text-3xl lg:text-4xl xl:text-5xl text-center mb-8 font-bold">
        Meet Our <span className="text-[#E03300]">Team</span>
      </h3>

      {/* First Row with 2 Members, Centered */}
      <div className="flex justify-center mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <TeamImage
            name="Saurav Kumar"
            designation="CEO & Co-Founder"
            goformeet="https://www.goformeet.co/sauravkumar"
            image={images.saurav}
          />
          <TeamImage
            name="Prashob P"
            designation="CTO & Co-Founder"
            goformeet="https://goformeet.co/prashob"
            image={images.prashob}
          />
        </div>
      </div>

      {/* Second Row with 5 Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        <TeamImage
          name="Shashank Chaurasia"
          designation="Investor Relationship Manager"
          goformeet=""
          image={images.shashank}
        />
        <TeamImage
          name="Abinesh"
          designation="Software Engineer"
          goformeet="https://www.goformeet.co/abinesh"
          image={images.abinesh}
        />
        <TeamImage
          name="Shweta Bhusare"
          designation="Social Media Manager"
          goformeet="https://www.goformeet.co/shweta"
          image={images.shwetha}
        />
        <TeamImage
          name="Arijit Bhattacharjee"
          designation="Content Writer"
          goformeet="https://www.goformeet.co/arijitbhattacharjee"
          image={images.arijith}
        />
        <TeamImage
          name="Pranav Tyagi"
          designation="Graphic Designer"
          goformeet="https://www.goformeet.co/pranavtyagi"
          image={images.pranav} 
        />
      </div>

      <div className="flex justify-center mt-10">
        <Link href="https://www.linkedin.com/company/goformeet/people/" target="_blank">
          <Button
            variant="outline"
            className="border-[#a9260050] text-[#a92600] font-bold text-lg px-10 mx-auto"
          >
            View All Team Members
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Team;
