import { useParams } from "next/navigation";
import React from "react";

const ProfileView = ({ params }: { params: { userid: string } }) => {
  const { userid } = params;
  console.log(userid);
  return <div></div>;
};

export default ProfileView;
