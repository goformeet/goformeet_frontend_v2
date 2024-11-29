"use client";

import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Oval width={48} color="#E13300" secondaryColor="#F6BFB0" />
    </div>
  );
};

export default Loader;
