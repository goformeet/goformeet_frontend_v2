"use client";

import React, { useState } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CheckoutDetails, ServiceDetailsTypes } from "@/types";
import { Separator } from "../ui/separator";
import GooglemapCard from './GooglemapCard';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormTextField } from "../admin/FormFields";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Oval } from "react-loader-spinner";

export const checkoutDetailsForm = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  callPurpose: z.string().min(1, 'Call purpose is required'),
  phoneNumber: z.string()
  .length(10, "Phone number must be 10 digits")
  .regex(/^\d{10}$/, "Phone number must be numeric and 10 digits long"),
  location: z.object({ lat: z.number().optional(), lng: z.number().optional() }).nullable(), // Updated location structure
  directionsUrl: z.string().optional(), // Add directionsUrl field to schema
});

const CheckoutForm = ({
  serviceDetails,
  selectedTime,
  meetingType,
}: {
  serviceDetails: ServiceDetailsTypes;
  selectedTime: Date;
  meetingType: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof checkoutDetailsForm>>({
    resolver: zodResolver(checkoutDetailsForm),
    defaultValues: {
      name: "",
      email: "",
      callPurpose: "",
      phoneNumber: "",
      location: null, // Updated default value
      directionsUrl: "",
    },
  });

  

  // Define Location type
  interface Location {
    lat: number;
    lng: number;
  }

  const handleLocation = (location: Location | null, directionsUrl: string | null) => {

    if (meetingType === "Offline") {
      if (!directionsUrl) {
        // Set the error message if directionsUrl is not provided
        setLocationError("Please confirm your meeting location by providing a directions URL.");
      } else {
        setLocationError(null); // Clear the error if directionsUrl is provided
        if (location) {
          form.setValue("location", { lat: location.lat, lng: location.lng });
        }
        form.setValue("directionsUrl", directionsUrl || ""); // Ensure directionsUrl is set
      }
    }
  };

  const createOrderId = async (payment: number) => {
    console.log("Create orderid is called");
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: payment,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      return null;
    }
  };

  const makePayment = async (
    amount: number,
    customerDetails: { name: string; email: string; contact: string }
  ): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      // Create order ID for payment
      const orderId = await createOrderId(amount);
      if (!orderId) {
        console.error("Failed to create order ID.");
        reject("Failed to create order ID.");
        return;
      }
      // Define Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY_ID, // Make sure this key is defined in your .env.local file
        amount, // Amount is in paisa
        currency: "INR",
        name: "Goformeet",
        description: serviceDetails.serviceDetails.name,
        order_id: orderId,
        handler: async function (response: any) {
          const paymentData = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          try {
            const paymentResponse = await fetch("/api/payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentData),
            });

            if (!paymentResponse.ok) {
              throw new Error("Payment failed");
            }
            const paymentStatus = {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              payment_status: await paymentResponse.json(),
            };
            resolve(paymentStatus); // Resolve the promise with the payment status
          } catch (error) {
            console.error("Payment handling failed:", error);
            reject(error); // Reject the promise with an error
          }
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.contact,
        },
        notes: {
          address: "Goformeet",
        },
        theme: {
          color: "#E03300",
        },
      };

      // Open Razorpay payment gateway
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    });
  };

  async function onSubmit(values: z.infer<typeof checkoutDetailsForm>) {
    // Create finalValues object for API submission
    if (meetingType === "Offline" && !values.directionsUrl) {
      setLocationError("Please confirm your meeting location by providing a directions URL.");
      return; // Prevent form submission if error exists
    }
    const finalValues: any = {
      guestName: values.name,
      bookingDateTime: new Date().toLocaleString(),
      meetingType,
      serviceId: serviceDetails.serviceDetails.serviceId,
      hostName: serviceDetails.name,
      guestEmail: values.email,
      guestPhoneNumber: values.phoneNumber,
      meetingDescription: values.callPurpose,
      isMeetingEnded: false,
      isMeetingStarted: false,
      isOrderAccepted: false,
      isOrderDeclined: false,
      isRefunded: false,
      isPaymentCreditedToHost: false,
      isPaymentDoneByGuest: true,
      hostId: serviceDetails.hostId,
      serviceName: serviceDetails.serviceDetails.name,
      feedback: "",
      transactionId: "",
      adminPaymentTransId: "",
      selectedTiming: selectedTime.toISOString(),
      hoursChoosed: serviceDetails.serviceDetails.duration,
      meetingStartedTime: "",
      preferredTime: {
        date: selectedTime.toDateString(),
        time: [
          selectedTime.toLocaleTimeString(),
          new Date(
            selectedTime.getTime() +
            serviceDetails.serviceDetails.duration * 60000
          ).toLocaleTimeString(),
        ],
      },
      totalAmount:
        meetingType === "Online"
          ? serviceDetails.serviceDetails.onlinePricing
          : serviceDetails.serviceDetails.offlinePricing,
      meetingLocation: values.location ? `Lat: ${values.location.lat}, Lng: ${values.location.lng}` : '', // Format location for submission
      directionsUrl: values.directionsUrl, // Add the directions URL
    };
    const customerDetails = {
      name: values.name,
      email: values.email,
      contact: values.phoneNumber,
      location: values.location,
    };

  
    try {
      let paymentDetails;
      if (finalValues.totalAmount > 0) {
        paymentDetails = await makePayment(
          finalValues.totalAmount * 100,
          customerDetails
        );
      }
      if (paymentDetails?.payment_status.isOk || finalValues.totalAmount === 0) {
        setOpen(true);
        if (paymentDetails) {
          finalValues["userPaymentTransactionId"] = paymentDetails.payment_id;
        }
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/new-meeting`;
        console.log(apiUrl);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ meetingDetails: finalValues }),
        };
        try {
          const response = await fetch(apiUrl, options);
          if (!response.ok) {
            throw new Error("API request failed");
          }
          const data = await response.json();
          // Navigate to success page
          if (finalValues.totalAmount === 0) {
            return router.push(`/freemeeting-details`);
          }
          router.push(`/meeting-details`);
        } catch (error) {
          console.error("API request failed: ", error);
        }
      } else {
        console.log("Payment failed: ", paymentDetails.payment_status);
        // Handle the failed payment, show an error message to the user
      }
    } catch (error) {
      console.error("Payment failed: ", error);
      // Handle the error, show an error message to the user
    }
  }

  return (
    <div className="bg-[#FCEBE6] w-full lg:max-w-[600px] my-10 rounded-md">
      <div className="flex gap-3 items-center px-5 py-5">
        <FaArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <Avatar>
          <AvatarImage
            src={serviceDetails.profileImage}
            alt={serviceDetails.name}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <h2 className="font-bold text-xl">{serviceDetails.name}</h2>
      </div>
      <Separator />
      <div className="px-5 py-5">
        <h1 className="font-bold text-3xl">
          {serviceDetails.serviceDetails.name}
        </h1>
        <p className="text-sm text-slate-400">
          {meetingType ? meetingType : "Online"} Meeting |{" "}
          {serviceDetails.serviceDetails.duration} Min
        </p>
        <div className="bg-white my-4 rounded-md px-5 py-4 flex justify-between">
          <div>
            <p>
              {selectedTime.toLocaleDateString("en-US", { weekday: "short" })},{" "}
              {selectedTime.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>{" "}
            <p>
              {selectedTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              router.back();
            }}
          >
            Change
          </Button>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 my-5"
            onSubmit={form.handleSubmit(onSubmit)} // Connect the onSubmit handler here
          >
            <FormTextField
              form={form.control}
              name="name"
              labelName="Name"
              placeholder="Enter your name"
            />
            <FormTextField
              form={form.control}
              name="email"
              labelName="Email"
              placeholder="Enter your email"
            />
            <FormTextField
              form={form.control}
              name="callPurpose"
              labelName="What is the purpose of this Meeting?"
              placeholder="Enter purpose of the meeting"
            />
            <FormTextField
              form={form.control}
              name="phoneNumber"
              labelName="Phone number"
              placeholder="Enter Phone number"
              type="tel" 
              pattern="^\d{10}$" 
              inputMode="numeric" 
            />
            {meetingType === 'Offline' && (
              <div className="my-[0.5]">
                <GooglemapCard
                handleLocation={handleLocation}
                location={serviceDetails.serviceDetails.location ? {
                  type: "Point",
                  coordinates: serviceDetails.serviceDetails.location.coordinates
                  } : null}
                  />
{locationError && <p className="text-red-500 text-sm mt-2">{locationError}</p>} {/* Display error message */}


              </div>
            )}
            <div>
              {meetingType === "Online" && serviceDetails.serviceDetails.onlinePricing > 0 ||
               meetingType === "Offline" && serviceDetails.serviceDetails.offlinePricing > 0 ? (
                <Collapsible className="my-4" defaultOpen>
                  <CollapsibleTrigger className="flex w-full justify-between my-2">
                    <h2 className="font-bold text-2xl">Order Summary</h2>
                    <FaChevronDown className="rounded-full hover:bg-gray-200 w-10 h-10 p-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white p-3 rounded-md">
                    <div className="flex justify-between pb-3">
                      <p>1 x {serviceDetails.serviceDetails.name}</p>
                      <p>
                        ₹{" "}
                        {meetingType === "Online"
                          ? serviceDetails.serviceDetails.onlinePricing
                          : serviceDetails.serviceDetails.offlinePricing}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex justify-between pt-3 font-bold">
                      <p>1 x {serviceDetails.serviceDetails.name}</p>
                      <p>
                        ₹{" "}
                        {meetingType === "Online"
                          ? serviceDetails.serviceDetails.onlinePricing
                          : serviceDetails.serviceDetails.offlinePricing}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : null}
            </div>
            <div className="flex gap-4">
            <Badge variant="outline" className="px-4 py-4 w-full">
  {meetingType ? meetingType : "Online"} 
  {meetingType === "Online" && serviceDetails.serviceDetails.onlinePricing > 0 && 
    ` ₹ ${serviceDetails.serviceDetails.onlinePricing}`}
  {meetingType === "Offline" && serviceDetails.serviceDetails.offlinePricing > 0 && 
    ` ₹ ${serviceDetails.serviceDetails.offlinePricing}`}
</Badge>

              <Button type="submit" className="px-5 py-4 w-full">
                Checkout
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Dialog open={open}>
        <DialogTrigger asChild>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Saving Details to Database</DialogTitle>
            <DialogDescription className="h-30 flex justify-center items-center">
              <Oval width={48} color="#E13300" secondaryColor="#F6BFB0" />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutForm;
