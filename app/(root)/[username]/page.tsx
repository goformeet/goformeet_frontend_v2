import CarouselImage from "@/components/shared/CarouselImage";
import Loader from "@/components/shared/Loader";
import { notFound } from 'next/navigation';
import ProfileTextCard from "@/components/shared/ProfileTextCard";
import DownloadAppModal from "@/components/shared/DownloadAppModal";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";
import { ServiceCardProps } from "@/types";
import { redirect } from "next/navigation";
import BookMeeting from "@/components/shared/BookMeeting";
import { NotFoundImage } from "@/components/shared/NotFoundImage";


type Props = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;
  console.log(username);

  try {
    const profileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-profile/${username}`
    );

   const profileText = await profileResponse.text();
    console.log("Profile response text:", profileText);  
    if (!profileResponse.ok) {
      throw new Error("Network response was not ok");
    }

    const profile = JSON.parse(profileText);  
    const profileData = profile.profile;
    const { personalDetails } = profileData;
    const { name, profession, city, state } = personalDetails;

    return {
      title: `Schedule and meet with ${name} on Goformeet`,
      description:
        "Goformeet your go-to app for hassle-free meetings. Book people of your choice vibe and embrace your connection with them",
      keywords: `${profession} in ${city},${profession} in ${state},Meet ${profession},${name},${profession} ${name},${profession} in ${city},${state},goformeet, GoForMeet, go for meet, Go For Meet, Go4meet, meeting aap, Professional, Meeting, face to face timing, Earn money, Make money online, Looking for New opportunity, freelance, jobs, doctor freelance, model, freelance jobs for models, freelance jobs for trainers, freelance jobs for travel assistance, freelance jobs for personal assistance, freelance jobs for life coach, freelance jobs for companion, freelance jobs for actor, freelance jobs for students, freelance jobs for , freelance jobs for air hostes, freelance jobs for Atrologer, freelance jobs for artist, freelance jobs for fashion designer, freelance jobs for nurse, freelance jobs for recruiter, freelance jobs for fitness trainer, freelance jobs for analyst, freelance jobs for lawyer, freelance jobs for musician, freelance jobs photographer, Go for meet, Gofor meet, go formeet, go4meet, go 4 meet,go4 meet,go 4meet`,
      openGraph: {
        images: [
          {
            url: `https://goformeet.co/api/og?name=${encodeURIComponent(
              profileData.personalDetails.name.trim()
            )}&username=${username}`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    console.log(error);
    console.error("Error fetching profile data:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching the profile data.",
    };
  }
}


async function Profile({ params }: Props) {
  const username = params.username;

  async function getProfileData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-profile/${username}`,
        { cache: "no-cache" }
      );
      const data = await response.json();
      return data.profile;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const profileData = await getProfileData();

  if (!profileData) {
    console.log("Profile data not found");
    return <NotFoundImage />;
  }
  return (
    <section>
      <div className="profile-top-container custom-container">
        <div>
          <CarouselImage images={profileData.personalDetails.profileImages} />
        </div>
        <div className="profile-top-right">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="host-name">
                {profileData.personalDetails.name}{" "}
                <span className="host-username">
                  @{profileData.personalDetails.userName}
                </span>
              </h1>
              {profileData.personalDetails.isVerified && (
                <Image
                  src="/assets/icons/check.png"
                  alt="Blue Tick"
                  width={20}
                  height={20}
                />
              )}
            </div>
            <h2 className="host-profession">
              {profileData.personalDetails.profession}
            </h2>
            <p className="top-3-interests">
              {profileData.personalDetails.interests?.slice(0, 3).join(" | ")}
            </p>
          </div>
          <div>
            <div className="flex justify-end">
              <BookMeeting serviceName={profileData.hostDetails.myServices.name} username={username} />
            </div>
            <h4 className="city-details">
              📍{profileData.personalDetails.city} - City in{" "}
              {profileData.personalDetails.state}
            </h4>
            <ul className="social-links-container items-center">
              <li>
                {profileData?.personalDetails?.socialMediaLinks?.linkedIn ? (
                  <Link
                    href={
                      profileData?.personalDetails?.socialMediaLinks?.linkedIn
                    }
                  >
                    <Image
                      src="/assets/icons/linkedin.svg"
                      width={20}
                      height={20}
                      alt="LinkedIn"
                    />
                  </Link>
                ) : (
                  <Image
                    src="/assets/icons/linkedin.svg"
                    width={20}
                    height={20}
                    alt="LinkedIn"
                    className="opacity-50"
                    style={{ cursor: "not-allowed" }}
                  />
                )}
              </li>
              <li>
                {profileData?.personalDetails?.socialMediaLinks?.instagram ? (
                  <Link
                    href={
                      profileData?.personalDetails?.socialMediaLinks?.instagram
                    }
                  >
                    <Image
                      src="/assets/icons/instagram.svg"
                      width={18}
                      height={18}
                      alt="Instagram"
                    />
                  </Link>
                ) : (
                  <Image
                    src="/assets/icons/instagram.svg"
                    width={18}
                    height={18}
                    alt="Instagram"
                    className="opacity-50"
                    style={{ cursor: "not-allowed" }}
                  />
                )}
              </li>
              <li>
                {profileData?.personalDetails?.socialMediaLinks?.facebook ? (
                  <Link
                    href={
                      profileData?.personalDetails?.socialMediaLinks?.facebook
                    }
                  >
                    <Image
                      src="/assets/icons/facebook.svg"
                      width={12}
                      height={12}
                      alt="Facebook"
                    />
                  </Link>
                ) : (
                  <Image
                    src="/assets/icons/facebook.svg"
                    width={12}
                    height={12}
                    alt="Facebook"
                    className="opacity-50"
                    style={{ cursor: "not-allowed" }}
                  />
                )}
              </li>
              <li>
                {profileData?.personalDetails?.socialMediaLinks?.goformeet ? (
                  <Link
                    href={
                      profileData?.personalDetails?.socialMediaLinks?.goformeet
                    }
                  >
                    <Image
                      src="/assets/icons/goformeet.png"
                      width={20}
                      height={20}
                      alt="Facebook"
                    />
                  </Link>
                ) : (
                  <Image
                    src="/assets/icons/goformeet.png"
                    width={20}
                    height={20}
                    alt="Facebook"
                    className="opacity-50"
                    style={{ cursor: "not-allowed" }}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-48 lg:hidden">
        <div className="flex flex-col justify-center w-fit mx-auto text-center">
          <h1 className="host-name">
            {profileData.personalDetails.name}{" "}
            <span className="host-username">
              @{profileData.personalDetails.userName}
            </span>
          </h1>
          <p className="top-3-interests">
            {profileData.personalDetails.interests?.slice(0, 3).join(" | ")}
          </p>
          <h2 className="host-profession">
            {profileData.personalDetails.profession}
          </h2>
        </div>
      </div>
      <div className="custom-container profile-bottom-container">
        <div className="mt-10 lg:mt-48  w-full lg:min-w-64 lg:max-w-64 text-justify text-sm">
          <p>{profileData.personalDetails.aboutMe}</p>
          <div className="separation-line"></div>
        </div>
        <div className="profile-bottom-right">
          {profileData.hostDetails.myServices && (
            <section className="profile-bottom-section">
              <h2 className="profile-bottom-heading">My Services</h2>
              <div className="hidden lg:flex justify-between">
                <ul className="w-1/2">
                  {profileData.hostDetails.myServices
                    .slice(
                      0,
                      Math.ceil(profileData.hostDetails.myServices.length / 2)
                    )
                    .map((service: ServiceCardProps, index: number) => {
                      return (
                        <li
                          key={service.serviceId ? service.serviceId : index}
                          className="mb-3"
                        >
                          <ServiceCard
                            username={profileData.personalDetails.userName}
                            cardDetails={service}
                          />
                        </li>
                      );
                    })}
                </ul>
                <ul className="w-[48%]">
                  {profileData.hostDetails.myServices
                    .slice(
                      Math.ceil(profileData.hostDetails.myServices.length / 2)
                    )
                    .map((service: ServiceCardProps, index: number) => {
                      return (
                        <li
                          key={service.serviceId ? service.serviceId : index}
                          className="mb-3"
                        >
                          <ServiceCard
                            username={profileData.personalDetails.userName}
                            cardDetails={service}
                          />
                        </li>
                      );
                    })}
                </ul>
              </div>
              <ul className="flex lg:hidden flex-wrap gap-3">
                {profileData.hostDetails.myServices.map(
                  (service: ServiceCardProps, index: number) => {
                    return (
                      <li
                        key={service.serviceId ? service.serviceId : index}
                        className="h-full lg:w-[45%]"
                      >
                        <ServiceCard
                          username={profileData.personalDetails.userName}
                          cardDetails={service}
                        />
                      </li>
                    );
                  }
                )}
              </ul>
            </section>
          )}

          <section className="profile-bottom-section">
            <h2 className="profile-bottom-heading">My Interests</h2>
            <ul className="profile-cards-container">
              {profileData.personalDetails.interests?.map(
                (interest: string, index: number) => (
                  <ProfileTextCard key={index} content={interest} />
                )
              )}
            </ul>
          </section>
          {profileData.personalDetails.moreAboutMe?.lookingFor.length !== 0 && (
            <section className="profile-bottom-section">
              <h2 className="profile-bottom-heading">Looking For</h2>
              <ul className="profile-cards-container">
                {profileData.personalDetails.moreAboutMe?.lookingFor?.map(
                  (lookingFor: string, index: number) => (
                    <ProfileTextCard key={index} content={lookingFor} />
                  )
                )}
                {profileData.personalDetails.moreAboutMe?.meetingTypes
                  .length !== 0 &&
                  profileData.personalDetails.moreAboutMe?.meetingTypes.map(
                    (meetingType: string, index: number) => (
                      <ProfileTextCard key={index} content={meetingType} />
                    )
                  )}
              </ul>
            </section>
          )}
          {profileData.personalDetails.yourExpertise.length !== 0 && (
            <section className="profile-bottom-section">
              <h2 className="profile-bottom-heading">My Expertise</h2>
              <ul className="profile-cards-container">
                {profileData.personalDetails.yourExpertise?.map(
                  (expertise: string, index: number) => (
                    <ProfileTextCard key={index} content={expertise} />
                  )
                )}
              </ul>
            </section>
          )}
          {profileData.personalDetails.languages.length !== 0 && (
            <section className="profile-bottom-section">
              <h2 className="profile-bottom-heading">My Languages</h2>
              <ul className="profile-cards-container">
                {profileData.personalDetails.languages?.map(
                  (language: string, index: number) => (
                    <ProfileTextCard key={index} content={language} />
                  )
                )}
              </ul>
            </section>
          )}
          <section className="profile-bottom-section">
            <h2 className="profile-bottom-heading">More About Me</h2>
            <ul className="profile-cards-container">
              {profileData.personalDetails.moreAboutMe?.height && (
                <ProfileTextCard
                  content={`Height - ${profileData.personalDetails.moreAboutMe?.height}`}
                />
              )}

              <ProfileTextCard
                content={profileData.personalDetails.moreAboutMe.educationLevel}
              />
              {profileData.personalDetails.moreAboutMe?.personalityType !==
                "None" && (
                <ProfileTextCard
                  content={`Personality Type - ${profileData.personalDetails.moreAboutMe.personalityType}`}
                />
              )}
              {profileData.personalDetails.moreAboutMe?.smokingHabits !==
                "None" && (
                <ProfileTextCard
                  content={
                    profileData.personalDetails.moreAboutMe.smokingHabits
                  }
                />
              )}
            </ul>
          </section>
        </div>
        <div className="sticky lg:hidden bottom-0 py-2 bg-white">
          <DownloadAppModal>
            <Button className="sign-in-button text-white gap-2 items-center w-full">
              Book Meeting <ArrowRight className="w-[16px]" />
            </Button>
          </DownloadAppModal>
        </div>
      </div>
      <section className="custom-container mt-4">
        <h3 className="text-2xl font-bold mb-4">Keywords</h3>
        <ul className="flex gap-3 flex-wrap">
          {profileData &&
            profileData.hostDetails.keywords.map((keyword: string) => (
              <li className="profile-text-card" key={keyword}>
                {keyword}
              </li>
            ))}
        </ul>
      </section>
    </section>
  );
}

export default Profile;
