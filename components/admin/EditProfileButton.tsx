"use client";

import React from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { Edit2 } from "lucide-react";

const EditProfileButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Button
      onClick={() => {
        router.push(`${pathname}/edit`);
      }}
    >
      Edit Profile
    </Button>
  );
};

export default EditProfileButton;


