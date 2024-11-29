"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "../ui/form";

import { Button } from "../ui/button";
import { IProfile, ServiceCardProps } from "@/types";
import { adminProfileSchema } from "@/schema/adminProfileSchema";
import { v4 } from "uuid";

import { hostCategories, intrestTags, languages } from "@/constants";

import {
  FormTextField,
  FormTextAreaField,
  FormDateField,
  FormSelectField,
  FormArraySelectField,
  FormImagesField,
  FormCheckBoxField,
  KeywordInputField,
} from "./FormFields";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServiceCardForm } from "./ServiceCardForm";
import ServiceCardItem from "./ServiceCardItem";
import { toast, useToast } from "../ui/use-toast";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const AddProfileComponent = () => {
  const [open, setOpen] = useState(false); // Edit Service Modal
  const [open2, setOpen2] = useState(false); // Add Service Modal
  const [open3, setOpen3] = useState(false); // Final Confirmation modal
  const [selectedService, setSelectedService] =
    useState<ServiceCardProps | null>(null);

  const closeDialogFun = () => {
    setSelectedService(null);
    setOpen(false);
  };

  const { toast } = useToast();

  const generateTimeSlots = () => {
    const slots = [];
    const periods = ["AM", "PM"];

    for (let period of periods) {
      for (let hour = 0; hour < 12; hour++) {
        const formattedHour = hour === 0 ? 12 : hour;
        slots.push(`${formattedHour}:00 ${period}`);
        slots.push(`${formattedHour}:30 ${period}`);
      }
    }
    return slots;
  };

  const AddCloseDialog = () => {
    setSelectedService(null);
    setOpen2(false);
  };

  const generateDefaultMyTimings = () => {
    const daysOfWeek = [
      { day: "Sunday", isSelected: false },
      { day: "Monday", isSelected: true },
      { day: "Tuesday", isSelected: true },
      { day: "Wednesday", isSelected: true },
      { day: "Thursday", isSelected: true },
      { day: "Friday", isSelected: true },
      { day: "Saturday", isSelected: true },
    ];

    return daysOfWeek.map(({ day, isSelected }) => ({
      day,
      startingTime: "9:00 AM",
      endingTime: "6:00 PM",
      isSelected,
    }));
  };
   const [services, setServices] = useState<ServiceCardProps[]>([]);

  const form = useForm<z.infer<typeof adminProfileSchema>>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      personalDetails: {
        name: '',
        email:'',
        mobileNumber:'',
        userName: '',

        profileImages: [],
        aboutMe: '',
        city: '',
        dateOfBirth:new Date(),
        interests:[],
        gender: '',
        profession: '',
        languages: [],
        socialMediaLinks: {
          facebook: '',
          instagram:'',
          twitter: '',
          linkedin:'',
        },
        moreAboutMe: {
          communicationStyle:'',
          personalityType: '',
          educationLevel: '',
          lookingFor: [],
        },
        isVerified: false,
        isTopExpert:false,
      },
      bools: {
        isVisible: true,
      },
      hostDetails: {
        keywords:[],
        myServices: services,
        myTimings:generateDefaultMyTimings(),
      },
    },
  });


  const addService = (formDetails: ServiceCardProps) => {
    const newServices: ServiceCardProps[] = [
      ...services,
      {
        ...formDetails,
        serviceId: v4(),
      },
    ];
    form.setValue("hostDetails.myServices", newServices);
    setOpen(false);
    setServices(newServices);
  };

  const editService = (formDetails: ServiceCardProps) => {
    const updatedServices = services.map((service) =>
      service.serviceId === formDetails.serviceId ? formDetails : service
    );
    form.setValue("hostDetails.myServices", updatedServices);
    setServices(updatedServices);
  };

  const deleteService = (id: string) => {
    const updatedServices = services.filter(
      (service) => service.serviceId !== id
    );
    form.setValue("hostDetails.myServices", updatedServices);
    setOpen(false);
    setServices(updatedServices);
  };

  async function onSubmit(values: z.infer<typeof adminProfileSchema>) {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile-setup`;
    // const apiUrl = `http://localhost:3009/profile-setup`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({profileDetails: values }),
      });
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Profile Created successfully",
        });
      } else {
        const error: any = await response.json();
        toast({
          variant: "destructive",
          title: "Failed to Create profile",
          description: error.message,
        });
        throw new Error("Failed to Create profile");
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Failed to Create profile",
        description: err.message,
      });
      console.error("Failed to Create profile:", err);
    } finally {
      setOpen3(false); // Hide the confirmation modal after submission
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          onSubmit={form.handleSubmit((data) => {
            onSubmit(data);
            setOpen3(false); // Close the confirmation modal after submission
          })}
          className="px-10 space-y-8"
        >
          <h3 className="font-bold text-xl mb-3">Profile Photos</h3>
          <FormImagesField
            formOptions={form.control}
            name="personalDetails.profileImages"
            userid=''
            username='username'
          />
          <h3 className="font-bold text-xl">Personal Details</h3>
          <div className="flex gap-10 items-center">
            <FormTextField
              form={form.control}
              name="personalDetails.name"
              labelName="Name"
              placeholder="Enter your name"
            />

            <FormTextField
              form={form.control}
              name="personalDetails.userName"
              labelName="User Name"
              placeholder="Enter userName"
            />

            <FormTextField
              form={form.control}
              name="personalDetails.mobileNumber"
              labelName="Mobile Number"
              placeholder="Enter Mobile Number"
            />

            <FormTextField
              form={form.control}
              name="personalDetails.email"
              labelName="Email"
              placeholder="Enter you emmail"
            />
          </div>
          
          <div>
            <FormTextAreaField
              form={form.control}
              name="personalDetails.aboutMe"
              labelName="Bio"
              placeholder="Enter yout Bio"
            />
          </div>
            
        <div className="grid  grid-cols-2 gap-2">
          <div className="flex w-full flex-col">
            <FormTextField
              labelName="City"
              name="personalDetails.city"
              form={form.control}
            />
          </div>
          <div className="flex w-full flex-col mt-[2.3%]">
            <FormDateField
              name="personalDetails.dateOfBirth"
              form={form.control}
              labelName="Date Of Birth"
            />
          </div>
          <div className="flex w-full  flex-col">
            <FormSelectField
              name="personalDetails.gender"
              form={form.control}
              labelName="Gender"
              options={["Male", "Female"]}
              placeholder="Choose a Gender"
            />
          </div>
          <div className="flex w-full flex-col">
            <FormSelectField
              name="personalDetails.profession"
              form={form.control}
              labelName="Profession"
              options={hostCategories}
              placeholder="Choose a Profession"
            />
          </div>

          <div className="flex w-full flex-row space-x-4">
  <div className="w-4/12">
    <FormCheckBoxField
      name="personalDetails.isVerified"
      form={form.control}
      labelName="Verify User"
    />
  </div>
  <div className="w-4/12">
    <FormCheckBoxField
      name="bools.isVisible"
      form={form.control}
      labelName="User Visibility"
    />
  </div>
  <div className="w-4/12">
    <FormCheckBoxField
      name="bools.isTopExpert"
      form={form.control}
      labelName="Top Expert"
    />
  </div>
</div>

         </div>

          <div className="space-y-4">
            <FormArraySelectField
              formOptions={form.control}
              name="personalDetails.interests"
              allTags={intrestTags}
              label="Interests"
              description="Select Your Interests"
            />
            <FormArraySelectField
              formOptions={form.control}
              name="personalDetails.languages"
              allTags={languages}
              label="Languages"
              description="Select Your Languages"
            />
            <FormArraySelectField
              formOptions={form.control}
              name="personalDetails.moreAboutMe.lookingFor"
              allTags={["Casual Meeting", "Professional Meeting"]}
              label="Looking For"
              description="Select Which type of meetings you are looking for"
            />
          </div>

          <div className="mt-3">
            <h3 className="font-bold text-xl mb-3">More About Me</h3>
            <div className="grid grid-cols-4 gap-y-3 gap-x-3">
              <FormTextField
                name="personalDetails.moreAboutMe.communicationStyle"
                labelName="Communication Style"
                form={form.control}
              />
              <FormSelectField
                form={form.control}
                placeholder="Select Education Level"
                name="personalDetails.moreAboutMe.educationLevel"
                labelName="Education Level"
                options={[
                  "High School",
                  "Vocational School",
                  "In College",
                  "Undergraduate Degree",
                  "In Grad School",
                  "Graduate Degree",
                  "None",
                ]}
              />
              <FormSelectField
                form={form.control}
                placeholder="Select Personality Type"
                name="personalDetails.moreAboutMe.personalityType"
                labelName="Personality Type"
                options={["Introvert", "Extrovert", "Ambivert", "None"]}
              />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-bold text-xl mb-3">Social Media Links</h3>
            <div className="grid grid-cols-4 gap-y-3 gap-x-3">
              <FormTextField
                name="personalDetails.socialMediaLinks.facebook"
                labelName="Facebook Link"
                form={form.control}
              />
              <FormTextField
                name="personalDetails.socialMediaLinks.instagram"
                labelName="Instagram Link"
                 placeholder="Enter Instagram Link"
                form={form.control}
              />
              <FormTextField
                name="personalDetails.socialMediaLinks.linkedin"
                labelName="Linkedin Link"
                 placeholder="Enter Linkedin Link"
                form={form.control}
              />
              <FormTextField
                name="personalDetails.socialMediaLinks.goformeet"
                labelName="Goformeet Link"
                 placeholder="Enter Goformeet Link"
                form={form.control}
              />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xl mb-3">My Services</h3>
              <Dialog open={open2} onOpenChange={setOpen2}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setSelectedService(null);
                      setOpen2(true);
                    }}
                  >
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <ScrollArea>
                  <DialogHeader>
                    <DialogTitle>Add Service Details</DialogTitle>
                    <DialogDescription>
                      Add the Service Details
                    </DialogDescription>
                  </DialogHeader>
                  <ServiceCardForm
                    values={null}
                    handleSubmit={addService}
                    closeDialog={AddCloseDialog}
                  />
                  <ScrollBar />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
            <FormField
              control={form.control}
              name="hostDetails.myServices"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4 flex items-center justify-between">
                    <ul className="grid grid-cols-2 gap-3">
                      {services.map((field: ServiceCardProps) => (
                        <li
                          className="bg-white p-4 rounded-md"
                          key={field.serviceId}
                        >
                          <ServiceCardItem
                            key={field.serviceId}
                            field={field}
                            profile=''
                            editService={editService}
                            deleteService={deleteService}
                          />
                        </li>
                      ))}
                      {services.length === 0 && (
                        <h2>No Services to show. Please Add</h2>
                      )}
                    </ul>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-3">
            <h3 className="font-bold text-xl mb-3">Expert Timings</h3>
            <FormField
              control={form.control}
              name="hostDetails.myTimings"
              render={({ field }) => (
                <FormItem>
                  {field.value.map((value, i) => {
                    return (
                      <div key={i} className="mb-3 flex gap-3 items-center">
                        <FormTextField
                          labelName={`Day ${i + 1}`}
                          name={`hostDetails.myTimings.${i}.day`}
                          form={form.control}
                          disabled
                        />
                        <FormSelectField
                          labelName={`Start Time ${i + 1}`}
                          name={`hostDetails.myTimings.${i}.startingTime`}
                          form={form.control}
                          placeholder="Select Start Time"
                          options={generateTimeSlots()}
                        />
                        <FormSelectField
                          labelName={`End Time ${i + 1}`}
                          name={`hostDetails.myTimings.${i}.endingTime`}
                          form={form.control}
                          placeholder="Select End Time"
                          options={generateTimeSlots()}
                        />
                        <FormCheckBoxField
                          name={`hostDetails.myTimings.${i}.isSelected`}
                          form={form.control}
                          labelName="is Selected"
                        />
                      </div>
                    );
                  })}
                </FormItem>
              )}
            />
          </div>

          <div className="mt-3">
            <KeywordInputField
              name="hostDetails.keywords"
              label="Profile Keywords"
              description="Add keywords that needs to be shown in profile"
              formOptions={form.control}
            />
          </div>

          {/* Add more FormFields as needed */}
          <Dialog open={open3} onOpenChange={setOpen3}>
            <DialogTrigger asChild>
              <Button type="button" className="ml-auto">
                Submit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Submission</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to submit the changes?
              </DialogDescription>
              <div className="flex justify-end gap-4">
                <DialogClose asChild>
                  <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Yes
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button">No</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  );
};

export default AddProfileComponent;
