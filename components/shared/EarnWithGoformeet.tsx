"use client";

import Image from "next/image";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import EarnWithUsCard from "./EarnWithUsCard";
import { EarnWithUsCards } from "@/constants";

const EarnWithGoformeet = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const onClickSubmitBtn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/send-message", { mobileNumber });
      console.log(response.data);
      if (response.status === 200) {
        alert("OTP sent successfully");
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="bg-[#A92600] custom-container py-10 mb-10 lg:min-h-screen lg:flex ">
      <div className="flex-1 mb-5">
        <h2 className="text-4xl xl:text-5xl mb-3 font-semibold text-[#F6BFB0]">
          Earn with <br />
          <span className="text-white">#Goformeet</span>
        </h2>
        <p className="text-white xl:text-lg lg:w-3/5 font-light mb-10">
          At #Goformeet, our journey began with a vision to revolutionize
          professional networking by ensuring reliable and seamless meeting
          experiences.
        </p>
        <form
          onSubmit={onClickSubmitBtn}
          className="flex w-full max-w-sm items-center space-x-2 mb-10"
        >
          <Input
            type="text"
            name="mobileNumber"
            onChange={(event) => {
              setMobileNumber(event.target.value);
            }}
            placeholder="Mobile number"
          />
          <Button type="submit">Submit</Button>
        </form>
        <Image
          src="/assets/images/earnWithUsLeftArt.svg"
          alt="Left Art"
          className="w-full lg:min-w-[250px] xl:min-w-[400px] min-[1600px]:min-w-[90%] mx-auto mt-10 mb-20 lg:mt-0 lg:px-10"
          width={250}
          height={100}
        />
      </div>
      <div className="flex-1">
        <div className="lg:flex gap-4">
          {EarnWithUsCards.map((card) => (
            <EarnWithUsCard key={card.title} content={card} />
          ))}
        </div>
        <Image
          src="/assets/images/earnWithUsRightArt.svg"
          alt="Right Art"
          className="w-full lg:min-w-[400px] xl:min-w-[500px] min-[1600px]:min-w-[90%]  mx-auto lg:mt-20 xl:mt-20 min-[1600px]:mt-32 lg:px-10"
          width={250}
          height={100}
        />
      </div>
    </div>
  );
};

export default EarnWithGoformeet;
