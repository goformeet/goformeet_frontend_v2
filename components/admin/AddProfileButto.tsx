"use client";

import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

const AddProfilebutton = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Button
      onClick={() => {
        router.push(`/admin/hosts/add-profile`);
      }}
    >
      Add Profile
    </Button>
  );
};

export default AddProfilebutton;


