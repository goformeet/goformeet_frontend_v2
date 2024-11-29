import { ObjectId } from "mongodb";

declare interface MoreAboutMe {
  height?: number;
  communicationStyle?: string;
  dietaryPreferences?: "Vegan" | "Vegeterian" | "Non-Vegeterian" | "None";
  drinkingHabits?:
    | "Frequently"
    | "Socially"
    | "Rarely"
    | "Never"
    | "Sober"
    | "None";
  smokingHabits?:
    | "Frequently"
    | "Socially"
    | "Rarely"
    | "Never"
    | "Sober"
    | "None";
  personalityType?: "Introvert" | "Extrovert" | "Ambiverts" | "None";
  lookingFor: string[];
  educationLevel?:
    | "High School"
    | "Vocational School"
    | "In College"
    | "Undergraduate Degree"
    | "In Grad School"
    | "Graduate degree"
    | "None";
  meetingTypes: string[];
}

declare interface PersonalDetails {
  name: string;
  profession?: string;
  profilePercentage?: number;
  mobileNumber: string;
  email?: string;
  userName: string;
  referrerUid: string;
  profileImages: string[];

  languages?: string[];
  gender?: "Male" | "Female" | "Other";
  interests?: string[];
  aboutMe?: string;
  dateOfBirth?: Date | string;
  isVerified?: boolean;
  isTopExpert?: boolean;
  city?: string;
  state?: string;
  meetingFee?: number;
  moreAboutMe?: MoreAboutMe;
  socialMediaLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

declare interface Bools {
  isBlocked?: boolean;
  isVisible?: boolean;
}

declare interface LoginLocation {
  type: "Point";
  coordinates: [number, number];
}

declare interface Notification {
  [key: string]: string[];
}

declare interface WishList {
  [key: string]: string[];
}

declare interface Transaction {
  transactionId: string;
  amount: number;
  date: Date;
}

declare interface Timing {
  day: string;
  startTime: string;
  endTime: string;
}

declare interface SelectedTime {
  date: Date;
  time: string;
}

declare interface HostDetails {
  myWallet?: {
    balance: number;
    credit: Transaction[];
    debit: Transaction[];
    transactions: Transaction[];
  };
  myServices?: ServiceCardProps[];
  myTimings?: Timing[];
  mySchedule?: { meetingId: string; meetingTime: SelectedTime }[];
  keywords: string[];
}

declare interface IProfile {
  personalDetails: PersonalDetails;
  isHostActivated?: boolean;
  bools?: Bools;
  loginLocation?: LoginLocation;
  userId: string;
  notifications?: Notification[];
  wishList?: WishList[];
  referrerUid?: string;
  sortId?: number;
  hostDetails?: HostDetails;
}

declare interface IVerification {
  name: string;
  userid: string;
  mobileNumber: string;
  verificationType: string;
  documentType: string;
  aadharImage: [string, string];
  passbookImage: string;
  liveImage: string;
  aadharNumber: string;
  panNumber: string;
  DateOfBirth: Date;
  bankAccountNumber: string;
  IFSCCode: string;
  bankName: string;
  branchName: string;
  state: string;
  panImage: string;
  isAdminVerified: string;
}

declare interface IOrders {
  _id: string;
  meetingDetails: {
    meetingId: string;
    bookingDateTime: string;
    meetingType: string;
    meetingLink: string;
    guestId: string;
    guestName: string;
    hostId: string;
    hostName: string;
    hoursChoosed: string;
    isMeetingEnded: string;
    isMeetingStarted: string;
    isOrderAccepted: string;
    isOrderDeclined: string;
    isPaymentDoneByGuest: string;
    meetingEndTime: string;
    guestPhoneNumber:string;
    meetingLocation: {
      type: string;
      coordinates: Array<number>;
    };
    meetingLocationAddress: string;
    meetingOtp: string;
    meetingStartedTime: string;
    preferredTime: {
      date: string;
      time: Array<string>;
    };
    totalAmount: number;
    transactionId: string;
    adminPaymentTransactionId: string;
    feedback: string;
    userPaymentTransId: string;
  };
  hostProfession: string;
  guestProfession: string;
  hostMobileNumber: string;
  guestMobileNumber: string;
}

declare interface IHost {
  _id: string;
  personalDetails: {
    name: string;
    profession: string;
    userName: string;
    profileImages: string;
    isVerified: boolean;
    aboutMe: string;
    city: string;
  };
  bools: {
    isVisible: boolean;
  };
  userId: string;
  distance: number;
}

declare interface IDetails {
  image: string;
  name: string;
  username: string;
  description?: string;
  location?: string;
  isVerified?: boolean;
}

declare interface ServiceCardProps {
  name: string;
  shortDescription: string;
  longDescription: string;
  duration: number;
  isOfflineAvailable: boolean;
  onlinePricing: number;
  offlinePricing: number;
  serviceId: string;
  keywords: string[];
  location: {
    type: "Point";
    coordinates: [number, number]; // [Longitude, Latitude]
    address?: string; // Optional address field
  } | null;
}


declare interface HostTimings {
  day: string;
  startingTime: string;
  endingTime: string;
  isSelected?: boolean;
  _id?: string;
}

declare interface ServiceDetailsTypes {
  serviceDetails: ServiceCardProps;
  hostTimings: HostTimings[];
  profileImage: string;
  name: string;
  hostId: string;
}

declare interface CheckoutDetails {
  serviceDetails?: ServiceCardProps;
  selectedTiming?: HostTimings;
  hostDetails?: {
    profileImage: string;
    hostName: string;
  };
}

declare interface CheckoutForm {
  hostName: string;
  guestName: string;
  mobileNumber: string;
  hostId: string;
}


declare interface BlogContent {
  title: string;
  body: string;
  tags?: string[];
  coverImage?: string;
  summary?: string;
}

declare interface BlogMetadata {
  author: string;
  publishedDate: Date | string;
  title:string,
  updatedDate?: Date | string;
  views?: number;
  readTime?: string;
  isPublished: boolean;
}

declare interface IBlog {
  id: ObjectId;
  title:string,
  content: string;
  image: string;
  keywords: Array;
  metadata: BlogMetadata;  // publishedDate is part of metadata
  categories?: string[];
  comments?: {
    userId: string;
    comment: string;
    date: Date | string;
  }[];
  relatedBlogs?: ObjectId[];
}