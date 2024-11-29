import { ServiceCardProps } from "@/types";
import { useState } from "react";
import ServiceCard from "../shared/ServiceCard";
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
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
export default function ServiceCardItem({
  field,
  profile,
  editService,
  deleteService,
}: {
  field: ServiceCardProps;
  profile: any;
  editService: (data: ServiceCardProps) => void;
  deleteService: (serviceId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-md" key={field.serviceId}>
      <ServiceCard
        username={profile.personalDetails.userName}
        cardDetails={field}
      />
      <div className="mt-2 flex gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex-1" onClick={() => setOpen(true)}>
              Edit Service
            </Button>
          </DialogTrigger>
          <DialogContent className="py-5 px-10">
            <ScrollArea className="h-[600px]"> 
              <DialogHeader>
                <DialogTitle>Edit Service Details</DialogTitle>
                <DialogDescription>Edit the Service Details</DialogDescription>
              </DialogHeader>
              <ServiceCardForm
                key={field.serviceId} // Ensures form resets when switching
                values={field}
                handleSubmit={editService}
                closeDialog={() => setOpen(false)}
              />
              <ScrollBar />
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Button
          className="flex-1"
          onClick={() => deleteService(field.serviceId)}
        >
          Delete Service
        </Button>
      </div>
    </div>
  );
}
