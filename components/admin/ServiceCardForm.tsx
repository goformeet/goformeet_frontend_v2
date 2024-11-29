"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ServiceCardProps } from "@/types";
import {
  FormNumberField,
  FormTextAreaField,
  FormTextField,
  KeywordInputField,
} from "./FormFields";
import GooglemapCard from "../shared/GooglemapCard";
import { useState } from "react";

// Define the schema with location as an object with coordinates
const formSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  duration: z.number().positive(),
  onlinePricing: z.number(),
  offlinePricing: z.number(),
  isOfflineAvailable: z.boolean().default(false),
  serviceId: z.string().optional(),
  keywords: z.array(z.string()),
  location: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z.tuple([z.number(), z.number()]).default([0, 0]), // Longitude, Latitude
  }).nullable().optional(),
});

const DEFAULT_LOCATION = { lat: 12.9716, lng: 77.5946 }; // Bangalore

export function ServiceCardForm({
  values,
  handleSubmit,
  closeDialog,
}: {
  values: ServiceCardProps | null;
  handleSubmit: (data: ServiceCardProps) => void;
  closeDialog: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: values ? values.name : "",
      shortDescription: values ? values.shortDescription : "",
      longDescription: values ? values.longDescription : "",
      duration: values ? values.duration : 1,
      onlinePricing: values ? values.onlinePricing : 0,
      offlinePricing: values ? values.offlinePricing : 0,
      isOfflineAvailable: values ? values.isOfflineAvailable : false,
      serviceId: values ? values.serviceId : "",
      keywords: values ? values.keywords : [],
      location: values && values.location && values.location.coordinates[0] !== 0 && values.location.coordinates[1] !== 0
        ? values.location 
        : { type: "Point", coordinates: [DEFAULT_LOCATION.lng, DEFAULT_LOCATION.lat] }, // Use provided location or fallback to Bangalore
    },
  });

  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocation = (location: { lat: number; lng: number } | null) => {
    if (location) {
      setSelectedLocation(location);
      form.setValue("location.coordinates", [location.lng, location.lat]);
    }
  };

  const onSubmit = (formValues: z.infer<typeof formSchema>) => {
    const processedValues: ServiceCardProps = {
      ...formValues,
      serviceId: formValues.serviceId || v4(),
      duration: typeof formValues.duration === "string" ? parseFloat(formValues.duration) : formValues.duration,
      onlinePricing: parseFloat(formValues.onlinePricing.toString()),
      offlinePricing: parseFloat(formValues.offlinePricing.toString()),
      location: formValues.location || { type: "Point", coordinates: [0, 0] },
    };

    console.log("Processed values being sent to backend:", processedValues);
    handleSubmit(processedValues);
    form.reset();
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormTextField
            name="name"
            form={form.control}
            labelName="Service Name"
          />
          <FormTextField
            name="shortDescription"
            form={form.control}
            labelName="Short Description"
          />
        </div>
        <FormTextAreaField
          name="longDescription"
          form={form.control}
          labelName="Long Description"
        />
        <div className="grid grid-cols-2 gap-3">
          <FormNumberField
            name="duration"
            form={form.control}
            labelName="Duration"
          />
          <FormNumberField
            name="onlinePricing"
            form={form.control}
            labelName="Online Pricing"
          />
        </div>
        <KeywordInputField
          name="keywords"
          label="Service Keywords"
          description="Add keywords to display on the Service page"
          formOptions={form.control}
        />
        <FormField
          control={form.control}
          name="isOfflineAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormLabel>Are you available for offline Meeting?</FormLabel>
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        {form.getValues("isOfflineAvailable") && (
          <>
            <FormNumberField
              name="offlinePricing"
              form={form.control}
              labelName="Offline Pricing"
            />
            <FormField
              control={form.control}
              name="location"
              render={() => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <div className="mt-2">
                    <GooglemapCard handleLocation={handleLocation} defaultLocationName={values?.location?.address || ""} location={form.getValues("location")} />
                  </div>
                </FormItem>
              )}
            />
          </>
        )}
        <div className="flex justify-end space-x-2">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => { form.reset(); closeDialog(); }}>Close</Button>
        </div>
      </form>
    </Form>
  );
}
