"use client";

import { useAtom } from "jotai";
import { serviceAtom } from "@/atoms/serviceAtom";
import { useParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { FaArrowLeft, FaCalendar } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { HostTimings, ServiceDetailsTypes } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Loader from "./Loader";

const formatDate = (date: Date) => ({
  fullDay: date.toLocaleDateString("en-US", { weekday: "long" }),
  day: date.toLocaleDateString("en-US", { weekday: "short" }),
  date: date.toLocaleDateString("en-US", { day: "2-digit" }),
  month: date.toLocaleDateString("en-US", { month: "short" }),
});

const parseTime = (timeStr: string) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};
const generateTimeSlots = (
  startingTime: string,
  endingTime: string,
  duration: number,
  todayOnly: boolean = false // Add parameter for today-only filtering
) => {
  const times = [];
  const { hours: startHour, minutes: startMinutes } = parseTime(startingTime);
  const { hours: endHour, minutes: endMinutes } = parseTime(endingTime);

  let currentHour = startHour;
  let currentMinutes = startMinutes;

  // Get the current time and calculate the cutoff time
  const now = new Date();
  const nowHour = now.getHours();
  const nowMinutes = now.getMinutes();
  const currentTime = nowHour * 60 + nowMinutes; // Current time in minutes
  const cutoffTime = currentTime + 60; // Cutoff time, one hour ahead in minutes

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinutes < endMinutes)
  ) {
    const time = `${currentHour % 12 === 0 ? 12 : currentHour % 12}:${
      currentMinutes < 10 ? "0" : ""
    }${currentMinutes} ${currentHour < 12 ? "AM" : "PM"}`;
    
    const slotMinutes = currentHour * 60 + currentMinutes;

    // Include slot only if it meets the condition
    if (!todayOnly || (todayOnly && slotMinutes >= cutoffTime)) {
      times.push(time);
    }

    currentMinutes += duration * 30;
    if (currentMinutes >= 60) {
      currentMinutes -= 60;
      currentHour += 1;
    }
  }

  return times;
};
const getNextSixtyDays = (hostTimings: Array<HostTimings>) => {
  const dates = [];
  const today = new Date();

  const selectedDays = hostTimings
    .filter((timing) => timing.isSelected)
    .map((timing) => timing.day);

  const getDayName = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });

  let count = 0;
  while (count< 62) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + count);
    if (selectedDays.includes(getDayName(nextDate))) {
      dates.push(nextDate);
    }
    count++;
  }

  return dates;
};

const ServiceDetailsComponent = ({ meetingType }: { meetingType: string }) => {
  const params: { username: string; servicename: string } = useParams();
  const [service, setService] = useAtom(serviceAtom);
  const [data, setData] = useState<ServiceDetailsTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<Array<string>>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [hostTimings, setHostTimings] = useState<HostTimings[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const getServiceDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${params.username}/${params.servicename}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ServiceDetailsTypes = await response.json();
      setService({
        serviceDetails: data.serviceDetails,
        hostDetails: {
          profileImage: data.profileImage,
          hostName: params.username,
        },
      });
      setData(data);
      setHostTimings(data.hostTimings);
    } catch (err) {
      console.error("Error fetching service details", err);
      setError("Failed to fetch service details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
const initializeTimeSlots = useCallback(
  (date: Date) => {
    const fullDay = formatDate(date).fullDay;
    const dayDetails = hostTimings.find((details) => details.day === fullDay);

    if (dayDetails) {
      const todayOnly = date.toDateString() === new Date().toDateString(); // Check if the date is today
      const slots = generateTimeSlots(
        dayDetails.startingTime,
        dayDetails.endingTime,
        1,
        todayOnly // Pass todayOnly flag to generateTimeSlots
      );
      setTimeSlots(slots);
      setStart(slots[0]);
    } else {
      setTimeSlots([]);
      setStart("");
    }
  },
  [hostTimings]
);
  useEffect(() => {
    getServiceDetails();
  }, [params.username, params.servicename]);

  useEffect(() => {
    if (data && hostTimings.length > 0) {
      const fetchedDates = getNextSixtyDays(hostTimings);
      setDates(fetchedDates);
      const initialDate = fetchedDates[0].toDateString();
      setSelectedDate(initialDate);
      initializeTimeSlots(fetchedDates[0]);
    }
  }, [data, hostTimings, initializeTimeSlots]);

  useEffect(() => {
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      initializeTimeSlots(selectedDateObj);
    }
  }, [selectedDate, initializeTimeSlots]);

  const onClickBookMeeting = () => {
    // const selectedTiming = new Date(selectedDate,start);
    const selectedTiming = new Date(`${selectedDate} ${start}`);
    console.log(selectedTiming.toISOString());
    router.push(
      `${pathname}/checkout?selectedTiming=${selectedTiming.toISOString()}&meetingType=${meetingType}`
    );
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(timeSlots);
  return (
    <div className="custom-container py-10">
      <div className="lg:flex gap-10 mb-10">
        {/* Service Details Section */}
        {data && (
          <div className="flex-1 lg:w-1/2 shadow-lg mb-4">
            <div className="bg-[#FCEBE6] border-[#FCEBE6] p-5 rounded-t-xl shadow-lg">
              <div className="flex gap-2 items-center pb-10">
                <Button
                  variant="ghost"
                  onClick={() => {
                    router.back();
                  }}
                >
                  <FaArrowLeft />
                </Button>
                <h2 className="text-lg font-semibold">{params.username}</h2>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">
                    {data.serviceDetails.name}
                  </h3>
                  <p>{data.serviceDetails.shortDescription}</p>
                </div>
                <Avatar className="w-24 h-24">
                  <AvatarImage src={data.profileImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="bg-white text-black border-2 border-t-0 border-[#FCEBE6] rounded-b-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-1 border-r-2">
                  <div className="border p-3 rounded-full m-3 w-fit font-bold">
                    {meetingType === "Online"
                      ? `₹ ${data.serviceDetails.onlinePricing}`
                      : `₹ ${data.serviceDetails.offlinePricing}`}
                  </div>
                </div>
                <Separator orientation="vertical" />
                <div className="flex gap-2 pl-2 w-[45%] items-center">
                  <FaCalendar />
                  <p>{data.serviceDetails.duration} Minutes meeting</p>
                </div>
              </div>
              <Separator />
              <div className="p-5">
                <p className="text-justify">
                  {data.serviceDetails.longDescription}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Scheduling Section */}
        {data && (
          <div className="flex-1 lg:w-1/2 border-2 h-fit border-[#FCEBE6] p-5 shadow-lg rounded-xl">
            <h1 className="font-bold mb-6">When Should we meet?</h1>
            <Tabs
              defaultValue={selectedDate}
              value={selectedDate}
              onValueChange={(e: any) => setSelectedDate(e)}
            >
              <TabsList className="flex bg-transparent py-3">
                <ScrollArea className="lg:max-w-xl whitespace-nowrap rounded-md py-4 z-0">
                  {dates.map((date) => {
                    const { day, date: dayNum, month } = formatDate(date);
                    return (
                      <TabsTrigger
                        key={date.toDateString()}
                        className="border-[#FCEBE6] border-2 py-2 rounded-lg tab-trigger mx-auto !ml-0 text-center data-[state=active]:text-white"
                        value={date.toDateString()}
                      >
                        <div className="text-center">
                          <h3>{day}</h3>
                          <h2 className="font-bold">{`${dayNum} ${month}`}</h2>
                        </div>
                      </TabsTrigger>
                    );
                  })}
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </TabsList>
              <h2 className="font-bold mt-8">Select time of the day</h2>
              <TabsContent value={selectedDate}>
                <RadioGroup
                  value={start}
                  onValueChange={(e: any) => setStart(e)}
                  className="flex flex-wrap justify-start gap-2"
                >
                  {timeSlots.map((time) => (
                    <div key={time} className="w-fit h-fit">
                      <RadioGroupItem
                        asChild
                        value={time}
                        className="opacity-0 w-0 h-0"
                      />
                      <Button
                        variant="ghost"
                        value={time}
                        onClick={(e: any) => setStart(e.target.value)}
                        className={`border-2 w-28 px-4 py-2 font-bold rounded-lg ${
                          start === time
                            ? "text-[#a92600] border-[#FCEBE6]"
                            : ""
                        }`}
                      >
                        {time}
                      </Button>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>
            </Tabs>
            {/* Navigate to CheckoutPage */}
            <Button className="w-full mt-4" onClick={onClickBookMeeting}>
              Book Meeting
            </Button>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Keywords</h3>
        <ul className="flex gap-3 flex-wrap">
          {data &&
            data.serviceDetails.keywords.map((keyword) => (
              <li className="profile-text-card" key={keyword}>
                {keyword}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceDetailsComponent;
