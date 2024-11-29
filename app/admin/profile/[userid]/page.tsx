import CarouselImage from "@/components/shared/CarouselImage";
import ProfileTextCard from "@/components/admin/ProfileTextCard";
import { IProfile, ServiceCardProps } from "@/types";
import React from "react";
import MapCards from "@/components/admin/MapCards";
import BackButton from "@/components/admin/BackButton";
import EditProfileButton from "@/components/admin/EditProfileButton";
import ServiceCard from "@/components/shared/ServiceCard"; // Import the ServiceCard component
import { profile } from "console";

async function getProfile(userid: string): Promise<IProfile> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/${userid}`;
  const response = await fetch(apiUrl, { cache: "no-cache" });

  if (!response.ok) {
    console.error(`Error fetching profile: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error('Failed to parse JSON');
  }
}


const ProfilePage = async ({ params }: { params: { userid: string } }) => {
  const { userid } = params;
  const profile = await getProfile(userid);

  console.log(profile)
  const defaultProfileImages = [
    "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/StockImages%2Fplaceholder_user.png?alt=media&token=8f9886f4-94a4-476d-9a84-4c8512003778%E2%80%99",
  ];

  return (
    <div className="p-10 w-full">
      <div className="mb-5 flex gap-3 items-center justify-between">
        <div className="flex gap-3 items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">{profile.personalDetails.name}</h1>
          {profile.isHostActivated && (
            <p className="rounded-md border px-5 border-black">Host</p>
          )}
        </div>
        <EditProfileButton />
      </div>
      <div className="flex gap-10">
        <div className="">
          {profile.personalDetails.profileImages.length !== 0 ? (
            <CarouselImage images={profile.personalDetails.profileImages} />
          ) : (
            <CarouselImage images={defaultProfileImages} />
          )}
        </div>
        <div className="flex-1 xl:mr-20">
          <div className="flex justify-between gap-10 mt-5 mb-10">
            <ProfileTextCard title="Name" text={profile.personalDetails.name} />
            <ProfileTextCard
              title="Username"
              text={profile.personalDetails.userName}
            />
            {profile.personalDetails.profession && (
              <ProfileTextCard
                title="Profession"
                text={profile.personalDetails.profession}
              />
            )}
          </div>
          <div className="mb-10">
            <div className="xl:w-[90%]">
              <h4 className="font-bold text-xl">Bio</h4>
              <p className="text-lg">
                {profile.personalDetails.aboutMe || "No bio available"}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            {profile.personalDetails.city && (
              <ProfileTextCard
                title="City"
                text={profile.personalDetails.city} 
              />
            )}
            {profile.personalDetails.dateOfBirth && (
              <ProfileTextCard
                title="Date of Birth"
                text={new Date(
                  profile.personalDetails.dateOfBirth
                ).toLocaleDateString("en-GB")}
              />
            )}
            {profile.personalDetails.gender && (
              <ProfileTextCard
                title="Gender"
                text={profile.personalDetails.gender}
              />
            )}
          </div>
        </div>
      </div>
<div className="mt-10">
  {profile.personalDetails.email && (
    <ProfileTextCard title="Email" text={profile.personalDetails.email} />
  )}
  {profile.personalDetails.mobileNumber && (
    <div className="flex items-center">
      <ProfileTextCard
        title="Mobile Number"
        text={profile.personalDetails.mobileNumber}
      />
      <ProfileTextCard
        title="Referrer UID"
        text={profile.referrerUid?.toString() || 'N/A'} // Safely convert to string
      />

    </div>
  )}
</div>

      {profile.personalDetails.interests &&
        profile.personalDetails.interests.length > 0 && (
          <div>
            <h4 className="font-bold text-xl mt-10">Interests</h4>
            <ul className="flex gap-5 mt-3 flex-wrap">
              {profile.personalDetails.interests.map((interest, index) => (
                <MapCards key={index} content={interest} />
              ))}
            </ul>
          </div>
        )}
      {profile.personalDetails.languages &&
        profile.personalDetails.languages.length > 0 && (
          <div>
            <h4 className="font-bold text-xl mt-10">Languages</h4>
            <ul className="flex gap-5 mt-3 flex-wrap">
              {profile.personalDetails.languages.map((language, index) => (
                <MapCards key={index} content={language} />
              ))}
            </ul>
          </div>
        )}

      {profile.personalDetails.moreAboutMe?.meetingTypes &&
        profile.personalDetails.moreAboutMe.meetingTypes.length > 0 && (
          <div>
            <h4 className="font-bold text-xl mt-10">Meeting Types</h4>
            <ul className="flex gap-5 mt-3 flex-wrap">
              {profile.personalDetails.moreAboutMe.meetingTypes.map(
                (meetingType, index) => (
                  <MapCards key={index} content={meetingType} />
                )
              )}
            </ul>
          </div>
        )}
      {profile.hostDetails && Array.isArray(profile.hostDetails.myServices) && profile.hostDetails.myServices.length > 0 && (
        <div>
          <h4 className="font-bold text-xl mt-10">Services</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.hostDetails.myServices.map((service: ServiceCardProps, index: number) => (
              <ServiceCard key={index} cardDetails={service} username={profile.personalDetails.userName} />
            ))}
          </div>
        </div>
      )}
      {profile.hostDetails && Array.isArray(profile.hostDetails.keywords) && profile.hostDetails.keywords.length > 0 && (
        <div>
          <h4 className="font-bold text-xl mt-10">Keywords</h4>
          <ul className="flex gap-5 mt-3 flex-wrap">
            {profile.hostDetails.keywords.map((keyword, index) => (
              <MapCards key={index} content={keyword} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
