import BackButton from "@/components/admin/BackButton";
import EditProfileComponent from "@/components/admin/EditProfile";
import { IProfile } from "@/types";
import React from "react";

async function getProfile(userid: string): Promise<IProfile> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/${userid}`;
  const response = await fetch(apiUrl, { cache: "no-cache" });
  const data = await response.json();
  return data;
}

const EditProfile = async ({ params }: { params: { userid: string } }) => {
  const { userid } = params;
  const profile = await getProfile(userid);
  if(profile.personalDetails.dateOfBirth){
    profile.personalDetails.dateOfBirth = new Date(profile.personalDetails.dateOfBirth);
  }
  console.log(profile);

  return (
    <div className="p-10 w-full">
      <div className="mb-5 flex gap-3 items-center">
        <BackButton />
        <h1 className="text-2xl">
          Edit{" "}
          <span className="font-bold"> {profile.personalDetails.name}'s </span>{" "}
          Profile
        </h1>
        {profile.isHostActivated && (
          <p className="rounded-md border px-5 border-black">Expert</p>
        )}
      </div>
      <EditProfileComponent profile={profile} />
    </div>
  );
};

export default EditProfile;
