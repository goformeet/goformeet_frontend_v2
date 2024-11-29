"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IOrders } from "@/types";
import ProfileTextCard from "@/components/admin/ProfileTextCard";
import Link from "next/link"; // Correct import for Link
import UpdateTransaction from "@/components/admin/UpdateTransaction";
import BackButton from "@/components/admin/BackButton";

// Async function to fetch the meeting details
const getMeetingDetails = async (meetingId: string): Promise<IOrders | null> => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/meetings/${meetingId}`;
    const response = await fetch(apiUrl, { cache: "no-cache" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    return null;
  }
};

// MeetingDetails component
const MeetingDetails = ({ params }: { params: { meetingId: string } }) => {
  const [data, setData] = useState<IOrders | null>(null); // Store the meeting data
  const [address, setAddress] = useState<string | null>(null); // To store the address
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch the meeting details on component mount
  useEffect(() => {
    const fetchData = async () => {
      const meetingData = await getMeetingDetails(params.meetingId);
      setData(meetingData);
      setLoading(false);
    };
    fetchData();
  }, [params.meetingId]);

  // Function to fetch address from coordinates using Google Maps Geocoding API
  const fetchAddressFromCoordinates = async (coordinates: [number, number]) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[1]},${coordinates[0]}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const json = await response.json();
      if (json.results && json.results.length > 0) {
        setAddress(json.results[0].formatted_address); // Set the address state
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  // UseEffect to fetch the address if coordinates are available
  useEffect(() => {
    if (data?.meetingDetails?.meetingLocation?.coordinates && data.meetingDetails.meetingLocation.coordinates.length === 2) {
      const [longitude, latitude] = data.meetingDetails.meetingLocation.coordinates;
      fetchAddressFromCoordinates([longitude, latitude]);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching the data
  }

  if (!data) {
    return <div>Error: Data could not be loaded.</div>; // Error handling if data is not found
  }

  return (
    <div className="p-10 flex flex-col min-h-[90vh]">
      <div className="mb-5 flex gap-3 items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Meeting Details</h1>
      </div>
      {data && (
        <div>
          <div className="flex justify-between flex-wrap gap-10 mb-10">
            {/* Host Info */}
            <div className="lg:w-1/4">
              <h4 className="font-bold text-xl">Expert Name</h4>
              <Link
                href={`/admin/profile/${data.meetingDetails.hostId}`}
                className="text-blue-800 underline"
              >
                <p className="text-lg">{data.meetingDetails.hostName}</p>
              </Link>
            </div>
            <ProfileTextCard
              title="Host Profession"
              text={data.hostProfession}
            />
            <ProfileTextCard
              title="Host Mobile Number"
              text={data.hostMobileNumber}
            />
            {/* Guest Info */}
            <div className="lg:w-1/4">
              <h4 className="font-bold text-xl">Guest Name</h4>
              <Link
                href={`/admin/profile/${data.meetingDetails.guestId}`}
                className="text-blue-800 underline"
              >
                <p className="text-lg">{data.meetingDetails.guestName}</p>
              </Link>
            </div>
            <ProfileTextCard
              title="Guest Profession"
              text={data.guestProfession}
            />
            <ProfileTextCard
              title="Guest Mobile Number"
              text={data.meetingDetails.guestPhoneNumber}
            />
          </div>
          <div className="flex justify-between flex-wrap gap-10 mb-10">
            <ProfileTextCard
              title="Booked On"
              text={new Date(
                data.meetingDetails.bookingDateTime
              ).toLocaleDateString("en-GB")}
            />
            <ProfileTextCard
              title="Meeting Type"
              text={data.meetingDetails.meetingType}
            />
            <ProfileTextCard
              title={data.meetingDetails.meetingType === "Online" ? "Link" : "Location"}
              text={
                data.meetingDetails.meetingType === "Online" 
                ? <a href={data.meetingDetails.meetingLink} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                    {data.meetingDetails.meetingLink}
                  </a>
                : address || "Loading location..."
              }
            />
            <ProfileTextCard
              title="Order Status"
              text={
                data.meetingDetails.isOrderAccepted
                  ? "Accepted"
                  : data.meetingDetails.isOrderDeclined
                  ? "Rejected"
                  : "Waiting for Host Approval"
              }
            />
          </div>
          <div className="flex justify-between flex-wrap gap-10 mb-10">
            <ProfileTextCard
              title="Meeting Status"
              text={
                data.meetingDetails.isMeetingStarted
                  ? "Started"
                  : data.meetingDetails.isMeetingEnded
                  ? "Ended"
                  : "Not Yet Started"
              }
            />
            <ProfileTextCard
              title="Meeting Date"
              text={data.meetingDetails.preferredTime.date}
            />
            <ProfileTextCard
              title="Meeting Time"
              text={`${data.meetingDetails.preferredTime.time[0]} - ${data.meetingDetails.preferredTime.time[1]}`}
            />
          </div>
          <div className="flex justify-between gap-10 mb-10">
            <ProfileTextCard
              title="Starting Time"
              text={new Date(
                data.meetingDetails.meetingStartedTime
              ).toLocaleTimeString("en-GB")}
            />
            <ProfileTextCard
              title="Total Amount"
              text={`${data.meetingDetails.totalAmount} Rupees`}
            />
            <ProfileTextCard
              title="Hours Choosed"
              text={data.meetingDetails.hoursChoosed}
            />
          </div>
          <div className="flex justify-between gap-10 mb-10">
            <ProfileTextCard
              title="Transaction Id"
              text={data.meetingDetails.transactionId}
            />
            <div className="flex-1">
              <h3 className="font-bold text-xl">Admin Transaction Id</h3>
              {data.meetingDetails.adminPaymentTransactionId ? (
                data.meetingDetails.adminPaymentTransactionId
              ) : (
                <UpdateTransaction />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingDetails;
