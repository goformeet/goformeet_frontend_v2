"use client"; // Add this line to declare this component as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LandingPageProfessions, LandingPageProfiles } from "@/constants";
import LandingProfileCard from "./LandingProfileCard";

const LandingProfiles = () => {
  const router = useRouter(); // Initialize router
  const [activeTab, setActiveTab] = useState("entrepreneur");

  const handleTabClick = (profession: string) => {
    if (profession === "More") {
      console.log(1);
      router.push('/hosts'); // Navigate to the /hosts route
    }
    setActiveTab(profession.toLowerCase());
  };

  return (
    <div className="landing-profiles" id="hosts">
      <h3 className="text-3xl lg:text-4xl xl:text-5xl text-center mb-8 font-bold">
        Meet Our <span className="text-[#E03300]">Experts</span>
      </h3>
      <div className="flex justify-center">
        <Tabs defaultValue={activeTab} className="mx-auto">
          <TabsList className="bg-transparent flex-wrap flex justify-center gap-y-3 mb-36 lg:mb-20">
            {LandingPageProfessions.map((profession) => (
              <TabsTrigger
                className="tab-trigger mx-auto data-[state=active]:text-white"
                key={profession}
                value={profession.toLowerCase()}
                onClick={() => handleTabClick(profession)}
              >
                {profession}
              </TabsTrigger>
            ))}
          </TabsList>
          {LandingPageProfiles.map((profile) => (
            <TabsContent
              key={profile.profession}
              value={profile.profession.toLowerCase()}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 gap-y-20 flex-wrap data-[state=inactive]:mt-0 data-[state=active]:mt-0"
            >
              {profile.profiles.map((profile) => (
                <LandingProfileCard key={profile.username} details={profile} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default LandingProfiles;
