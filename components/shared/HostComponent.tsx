"use client";

import LandingProfileCard from "@/components/shared/LandingProfileCard";
import { IDetails, IHost } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { hostCategories } from "@/constants";
import Loader from "@/components/shared/Loader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorPage from "./ErrorPage";
import NoHosts from "./NoHosts";
import HostPagination from "./HostPagination";
import Image from "next/image"; 

type ILocation = {
  longitude: number;
  latitude: number;
};

const APIStatusConstants = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const HostComponent = () => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [hosts, setHosts] = useState<Array<IDetails> | null>(null);
  const [apiStatus, setAPIStatus] = useState(APIStatusConstants.LOADING);
  const [totalPages, setTotalPages] = useState(1);
  const [geoFetched, setGeoFetched] = useState(false);

  const params = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(params.get("page") || "1", 10);
  const profession = params.get("profession") || "All";
  const search = params.get("search") || "";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          if (latitude && longitude) {
            setLocation({ latitude, longitude });
          }
          setGeoFetched(true);
        },
        (error) => {
          console.error(error);
          setGeoFetched(true);
        }
      );
    } else {
      setGeoFetched(true);
    }
  }, []);

  useEffect(() => {
    if (geoFetched) {
      fetchHosts();
    }
  }, [location, profession, currentPage, search, geoFetched]);

  const fetchHosts = async () => {
    setAPIStatus(APIStatusConstants.LOADING);
    const response = await fetch(
      `/api/hosts?page=${currentPage}&profession=${profession}&search=${search}`,
      {
        method: "POST",
        body: JSON.stringify({
          longitude: location?.longitude,
          latitude: location?.latitude,
        }),
      }
    );

    const parsedResponse = await response.json();
    console.log(parsedResponse);
    const hosts: IHost[] = parsedResponse.hosts;

    const modifiedHosts = hosts?.map((host) => ({
      image: host.personalDetails.profileImages[0],
      name: host.personalDetails.name,
      username: `@${host.personalDetails.userName}`,
      description: host.personalDetails.aboutMe,
      location: host.personalDetails.city,
  isVerified: host.personalDetails.isVerified || false,
    }));
    setHosts(modifiedHosts);
    setTotalPages(parsedResponse.totalPages);
    setAPIStatus(APIStatusConstants.SUCCESS);
  };

  const handlePageChange = (newPage: number, newProfession?: string) => {
    const professionParam = newProfession || profession;
    router.push(
      `?page=${newPage}&profession=${professionParam}${
        search !== "" ? `&search=${search}` : ""
      }`
    );
  };

  const handleProfessionChange = (newProfession: string) => {
    setHosts(null);
    handlePageChange(1, newProfession);
  };

  const renderSuccessView = () => {
    if (!hosts || hosts.length === 0) {
      return <NoHosts />;
    }
    return (
      <TabsContent
        value={profession.toLowerCase()}
        className="flex gap-10 gap-y-20 flex-wrap data-[state=inactive]:mt-0 data-[state=active]:mt-0"
      >
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-2 lg:gap-24 gap-y-32">
          {hosts.map((profile) => (
            <LandingProfileCard key={profile.username} details={profile} />
          ))}
        </div>
      </TabsContent>
    );
  };

  const renderHostsView = () => {
    switch (apiStatus) {
      case APIStatusConstants.LOADING:
        return <Loader />;
      case APIStatusConstants.SUCCESS:
        return renderSuccessView();
      case APIStatusConstants.FAILURE:
        return <ErrorPage retryFunction={fetchHosts} />;
      default:
        return null;
    }
  };

  return (
    <div className="custom-container py-10">
      <h3 className="text-3xl lg:text-4xl xl:text-5xl text-center mb-10 font-bold">
        Meet Our <span className="text-[#E03300]">Experts</span>
      </h3>
      <div className="flex flex-col gap-10 justify-center">
        <Tabs value={profession.toLowerCase()} className="mx-auto z-0">
          <TabsList className="bg-transparent flex justify-center mb-24 w-full">
            <ScrollArea className="w-[90vw] lg:max-w-2xl  whitespace-nowrap rounded-md py-4 z-0">
              {hostCategories.map((profession) => (
                <TabsTrigger
                  className="tab-trigger mx-auto data-[state=active]:text-white"
                  key={profession}
                  value={profession.toLowerCase()}
                  onClick={() => handleProfessionChange(profession)}
                >
                  {profession}
                </TabsTrigger>
              ))}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsList>
          {renderHostsView()}
        </Tabs>
        {apiStatus === APIStatusConstants.SUCCESS && hosts?.length !== 0 && (
          <HostPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default HostComponent;
