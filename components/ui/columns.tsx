"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "./button";
import KYCModal from "../admin/KYCModal";

export type User = {
  slNo: number;
  mobileNumber: string;
  createdAt: Date;
  AccountCreated: boolean;
  hostActivated: boolean;
};

export type Host = {
  slNo: number;
  name: string;
  profession: string;
  createdAt: Date;
  lastLogin: Date;
  mobile: string;
  location: string;
};

export type KYCDetails = {
  slNo: string;
  name: string;
  mobileNumber: string;
  userid: string;
  _id: string;
  documentType: string;
};

export type Orders = {
  hostName: string;
  guestName: string;
  meetingId: string;
  totalAmount: number;
  _id: string;
  bookingDateTime: string;
  meetingLocationAddress: string;
  slNo: string;
};

export const userColumns: ColumnDef<User>[] = [
  {
    header: "Sl No",
    accessorKey: "slNo",
  },
  {
    header: "Mobile Number",
    id: "mobileNumber",
    accessorKey: "mobileNumber",
  },
  {
    header: "Created On",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString("en-GB");
    },
    accessorKey: "createdAt",
  },
  {
    header: "Account Created",
    cell: ({ row }) => {
      return row.getValue("hasCreatedAccount") ? (
        <div className="px-5 py-2 bg-[#1bcfb4] text-white font-semibold w-fit mx-auto">
          Yes
        </div>
      ) : (
        <div className="px-5 py-2 bg-[#e33200] text-white font-semibold w-fit mx-auto">
          No
        </div>
      );
    },
    accessorKey: "hasCreatedAccount",
  },
  {
    header: "Host Activated",
    cell: ({ row }) => {
      return row.getValue("isHost") ? (
        <div className="px-5 py-2 bg-[#1bcfb4] text-white font-semibold w-fit mx-auto">
          Yes
        </div>
      ) : (
        <div className="px-5 py-2 bg-[#e33200] text-white font-semibold w-fit mx-auto">
          No
        </div>
      );
    },
    accessorKey: "isHost",
  },
];

export const hostColumns: ColumnDef<Host>[] = [
  {
    header: "S.No",
    accessorKey: "id",
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
  },
  {
    header: "Name",
    id: "name",
    accessorKey: "personalDetails.name",
  },
  {
    header: "Profession",
    accessorKey: "personalDetails.profession",
  },
  {
    header: "Created On",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString("en-GB");
    },
    accessorKey: "createdAt",
  },
  {
    header: "Last Login",
    cell: ({ row }) => {
      return new Date(row.getValue("updatedAt")).toLocaleDateString("en-GB");
    },
    accessorKey: "updatedAt",
  },
  {
    header: "Mobile",
    accessorKey: "personalDetails.mobileNumber",
  },
  {
    header: "Location",
    accessorKey: "personalDetails.city",
  },
  {
    id: "userId",
    accessorKey: "userId",
    header: "Actions",
    cell: ({ row }) => {
      console.log(row.getValue("userId"));
      return (
        <Link href={`/admin/profile/${row.getValue("userId")}`}>
          <Button className="border-[#E03320]" variant="outline">
            View Profile
          </Button>
        </Link>
      );
    },
  },
];

export const KYCColumns: ColumnDef<KYCDetails>[] = [
  {
    header: "S.No",
    accessorKey: "id",
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
  },
  {
    header: "Name",
    accessorKey: "name",
    id: "name",
  },
  {
    header: "Mobile Number",
    accessorKey: "mobileNumber",
  },
  {
    header: "Document Type",
    accessorKey: "documentType",
  },
  {
    header: "Verification Type",
    accessorKey: "verificationType",
  },
  {
    header: "Status",
    accessorKey: "isAdminVerified",
    cell: ({ row }) => {
      return row.getValue("isAdminVerified") === "Accepted" ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4aa24e]"></div>
          <p>Verified</p>
        </div>
      ) : row.getValue("isAdminVerified") === "Rejected" ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#E32200]"></div>
          <p>Rejected</p>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFD700]"></div>
          <p>Pending</p>
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    header: "Actions",
    id: "id",
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return (
        <Link href={`/admin/verifications/${id}`}>
          <Button className="border-[#E03320]" variant="outline">
            View Details
          </Button>
        </Link>
      );
    },
  },
];

export const orderColumns: ColumnDef<Orders>[] = [
 {
    header: "S.No",
    accessorKey: "id",
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
  },
  {
    header: "Host Name",
    id: "hostName",
    accessorKey: "hostName",
  },
  {
    header: "Guest Name",
    accessorKey: "guestName",
  },
  {
    header: "Meeting Location",
    accessorKey: "meetingLocationAddress",
  },
  {
    header: "Total Amount",
    accessorKey: "totalAmount",
  },
  {
    accessorKey: "meetingId",
    header: "Actions",
    id: "id",
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return (
        <Link href={`/admin/orders/${id}`}>
          <Button className="border-[#E03320]" variant="outline">
            View Details
          </Button>
        </Link>
      );
    },
  },
];

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export type Blog = {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  views: number;
};

export const blogColumns: ColumnDef<Blog>[] = [
  {
    header: "S.No",
    accessorKey: "id",
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
  },
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ getValue }) => (
      <div className="truncate truncate-container">{truncateText(getValue<string>(), 40)}</div>
    ),
  },
  {
    header: "Author",
    accessorKey: "author",
  },
  {
    header: "Published Date",
    accessorKey: "publishedDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>("publishedDate"));
      return <div className="text-left">{date.toLocaleDateString("en-GB")}</div>;
    },
  },
  {
    header: "Updated Date",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>("updatedAt"));
      return <div className="text-left">{date.toLocaleDateString("en-GB")}</div>;
    },
  },
  {
    header: "Views",
    accessorKey: "views",
    cell: ({ getValue }) => <div className="text-left">{getValue<number>()}</div>,
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id: string = row.getValue<string>("id");
      return (
        <Link href={`/admin/blogs/edit/${id}`}>
          <Button className="border-[#E03320]" variant="outline">
            Edit Blog
          </Button>
        </Link>
      );
    },
  },
];