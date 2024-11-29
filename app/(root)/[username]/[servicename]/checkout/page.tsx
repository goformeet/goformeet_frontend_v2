import { serviceAtom } from "@/atoms/serviceAtom";
import CheckoutForm from "@/components/shared/CheckoutForm";
import { ServiceDetailsTypes } from "@/types";
import { useAtomValue } from "jotai";
import Script from "next/script";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  params: { username: string; servicename: string };
  searchParams: { selectedTiming: string; meetingType: string };
};

const getPreCheckoutDetails = async (username: string, servicename: string) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${username}/${servicename}`;
    const response = await fetch(apiUrl, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: ServiceDetailsTypes = await response.json();
    console.log("Service Details:", data);
    return data;
  } catch (err) {
    return null;
  }
};

const Checkout = async ({ params, searchParams }: Props) => {
  const preCheckoutDetails = await getPreCheckoutDetails(
    params.username,
    params.servicename
  );
  return (
    <div className="flex justify-center items-center">
      <>
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
      </>
      {preCheckoutDetails && (
        <CheckoutForm
          selectedTime={new Date(searchParams.selectedTiming)}
          serviceDetails={preCheckoutDetails}
          meetingType={searchParams.meetingType}
        />
      )}
    </div>
  );
};

export default Checkout;
