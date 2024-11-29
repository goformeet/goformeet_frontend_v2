import {
  CheckoutDetails,
  ServiceCardProps,
  ServiceDetailsTypes,
} from "@/types";
import { Atom, atom } from "jotai";

const defaultValue: CheckoutDetails = {
  serviceDetails: {
    keywords: [""],
    serviceId: "abc",
    name: "Resume Review",
    duration: 1,
    location: {
      type: "Point",
      coordinates: [0, 0], // replace with appropriate latitude and longitude
      address: "Default Location", // optional
    },
    isOfflineAvailable: true,
    offlinePricing: 1000,
    onlinePricing: 1000,
    shortDescription: "Review your resume for potential employers",
    longDescription: "Review your resume for potential",
  },
  hostDetails: {
    hostName: "Early Jobs",
    profileImage:
      "https://goformeet.s3.ap-south-1.amazonaws.com/undefined/image_cropper_56DBAFEE-C9E0-4E65-8771-9C9AB9133573-32725-000009A5580008F8.jpg",
  },
  selectedTiming: {
    day: new Date().toDateString(),
    startingTime: "10:00 AM",
    endingTime: "11:00 AM",
  },
};

export const serviceAtom = atom<CheckoutDetails>(defaultValue);
