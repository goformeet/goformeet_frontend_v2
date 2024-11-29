"use client";

import React from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        router.back();
      }}
    >
      <FaArrowLeft />
    </Button>
  );
};

export default BackButton;
