import CarouselImage from "@/components/shared/CarouselImage";
import Loader from "@/components/shared/Loader";
import ProfileTextCard from "@/components/shared/ProfileTextCard";
import DownloadAppModal from "@/components/shared/DownloadAppModal";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  params: { username: string };
};


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;

  
  redirect(`/${username}`);

  
  return {
    title: `Redirecting...`,
    description: "Redirecting to the profile page",
  };
}

async function Profile({ params }: Props) {
  const username = params.username;

  // Function to fetch profile data
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
    return <Loader />;
  }

  return (
    <section>
      <div className="profile-top-container custom-container">
        <div>
          <CarouselImage images={profileData.personalDetails.profileImages} />
        </div>
        <div className="profile-top-right">
          <div>
            <h1 className="host-name">
              {profileData.personalDetails.name}{" "}
              <span className="host-username">
                @{profileData.personalDetails.userName}
              </span>
            </h1>
            <h2 className="host-profession">
              {profileData.personalDetails.profession}
            </h2>
            <p className="top-3-interests">
              {profileData.personalDetails.interests?.slice(0, 3).join(" | ")}
            </p>
          </div>
          <div>
            <div className="flex justify-end">
              <DownloadAppModal>
                <Button className="secondary-button gap-2 items-center">
                  Book Meeting{" "}
                  <Image
                    alt="Right Arrow"
                    src="/assets/icons/rightArrow.svg"
                    width={16}
                    height={16}
                  />
                </Button>
              </DownloadAppModal>
            </div>
            <h4 className="city-details">
              📍{profileData.personalDetails.city} - City in{" "}
              {profileData.personalDetails.state}
            </h4>
            <ul className="social-links-container">
              <li>
                <Link href="/">
                  <Image
                    src="/assets/icons/linkedin.svg"
                    width={20}
                    height={20}
                    alt="LinkedIn"
                  />
                </Link>
              </li>
              <li>
                <Image
                  src="/assets/icons/youtube.svg"
                  width={20}
                  height={20}
                  alt="YouTube"
                />
              </li>
              <li>
                <Image
                  src="/assets/icons/behance.svg"
                  width={20}
                  height={20}
                  alt="Behance"
                />
              </li>
              <li>
                <Image
                  src="/assets/icons/twitter.svg"
                  width={20}
                  height={20}
                  alt="Twitter"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile View of Profile */}
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

      {/* Profile Bottom Container */}
      <div className="custom-container profile-bottom-container">
        <div className="mt-10 lg:mt-48  w-full lg:min-w-64 lg:max-w-64 text-justify text-sm">
          <p>{profileData.personalDetails.aboutMe}</p>
          <div className="separation-line"></div>
        </div>
        <div className="profile-bottom-right">
          {/* My Interests */}
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

          {/* Looking For */}
          {profileData.personalDetails.moreAboutMe?.lookingFor && (
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

          {/* My Expertise */}
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

          {/* My Languages */}
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

          {/* More About Me */}
          {/* <section className="profile-bottom-section">
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
                  content={profileData.personalDetails.moreAboutMe.smokingHabits}
                />
              )}
            </ul>
          </section> */}
        </div>

        {/* Sticky Button for Mobile */}
        <div className="sticky lg:hidden bottom-0 py-2 bg-white">
          <DownloadAppModal>
            <Button className="sign-in-button text-white gap-2 items-center w-full">
              Book Meeting <ArrowRight className="w-[16px]" />
            </Button>
          </DownloadAppModal>
        </div>
      </div>
    </section>
  );
}

export default Profile;
