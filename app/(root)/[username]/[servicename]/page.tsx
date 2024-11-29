import React from "react";
import Loader from "@/components/shared/Loader";
import { Suspense } from "react";
import ServiceDetailsComponent from "@/components/shared/ServiceDetailsComponent";
import { Metadata, ResolvingMetadata } from "next";
import { ServiceCardProps } from "@/types";

type Props = {
  params: { username: string; servicename: string };
  searchParams: { meetingType: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${params.username}/${params.servicename}`;
    const profileResponse = await fetch(apiUrl);

    if (!profileResponse.ok) {
      throw new Error("Network response was not ok");
    }
    console.log('1')

    const data = await profileResponse.json();
    console.log('2')

    const serviceDetails: ServiceCardProps = data.serviceDetails;
    const profileData = data.profile;
    console.log(data)

    return {


      title: `${serviceDetails.name}`,
      description: serviceDetails.shortDescription,
      keywords: serviceDetails.keywords,
      openGraph: {
        images: [
          {
            url: `https://goformeet.co/api/og?name=${encodeURIComponent(serviceDetails.name.trim())}&username=${params.username}`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };

  } catch (error) {
    console.error("Error fetching profile data:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching the profile data.",
    };
  }
}

const ServiceDetails = ({ searchParams }: Props) => {
  return (
    <Suspense fallback={<Loader />}>
      <ServiceDetailsComponent meetingType={searchParams.meetingType} />
    </Suspense>
  );
};

export default ServiceDetails;
