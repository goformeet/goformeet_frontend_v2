import { languages } from "@/constants";
import { nullable, z } from "zod";

export const adminProfileSchema = z.object({
  personalDetails: z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    mobileNumber: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    email: z.string().default(""),
    aboutMe: z.string(),
    userName: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    city: z.string(),
    dateOfBirth: z.date().optional(),
    referrerUid: z.string().optional(),
    gender: z.string().optional(),
    profession: z.string().optional(),
    isVerified: z.boolean().optional(),
    isTopExpert: z.boolean().optional(),
    interests: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    state: z.string().optional(),
    profileImages: z.array(z.string()).optional(),
    socialMediaLinks: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
    }),
    moreAboutMe: z.object({
      communicationStyle: z.string(),
      personalityType: z.string(),
      educationLevel: z.string(),
      lookingFor: z.array(z.string()),
      // meetingTypes: z.array(z.string()).optional(),
    }),
  }),
  bools: z.object({
    isVisible: z.boolean().default(true),
  }),
  hostDetails: z.object({
    myServices: z.array(
      z.object({
        serviceId: z.string().nullable(),
        name: z.string(),
        shortDescription: z.string(),
        longDescription: z.string(),
        duration: z.number(),
        isOfflineAvailable: z.boolean(),
        onlinePricing: z.number(),
        offlinePricing: z.number(),
        keywords: z.array(z.string()),
        location: z.object({
          type: z.literal("Point"), // Literal type "Point"
          coordinates: z.tuple([z.number(), z.number()]), // Tuple of [Longitude, Latitude]
          address: z.string().optional(), // Optional address field
        }).nullable(), // location can be null
      })
    )
    ,
    myTimings: z.array(
      z.object({
        day: z.string(),
        startingTime: z.string(),
        endingTime: z.string(),
        isSelected: z.boolean().optional(),
        _id: z.string().optional(),
      })
    ),
    keywords: z.array(z.string()),
  }),
});
