import AddProfileComponent from "@/components/admin/AddProfileComponent";
import BackButton from "@/components/admin/BackButton";
import { IProfile } from "@/types";
import React from "react";


const AddProfile = async () => {
  return (
    <div className="p-10 w-full">
        <div className="mb-5 flex gap-3 items-center">
        <BackButton/>
        <h1 className="text-2xl">
         Add
          Profile
        </h1>
      </div>
       <AddProfileComponent/>
    </div>
  );
};

export default AddProfile;
