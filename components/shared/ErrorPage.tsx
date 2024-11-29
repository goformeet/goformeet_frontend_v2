import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const ErrorPage = ({ retryFunction }: { retryFunction: any }) => {
  return (
    <div className="flex flex-col justify-center align-center min-h-[300px] w-full">
      <h1 className="neon-text text-8xl text-center tracking-widest mb-8">
        500
      </h1>
      <h1 className="text-4xl text-[#a92600] font-bold text-center">
        Error Loading Page
      </h1>
      <Button className="w-fit mx-auto px-10 mt-2" onClick={retryFunction}>
        Retry
      </Button>
    </div>
  );
};

export default ErrorPage;
