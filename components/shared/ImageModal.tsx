import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const ImageModal = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Image src={imageUrl} alt="image" className="rounded-md" height={300} width={300} />
      </DialogTrigger>
      <DialogContent>
        <div className="object-fit w-full h-full p-3">
          <Image src={imageUrl} className="rounded-md" alt="image" height={1080} width={720} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
