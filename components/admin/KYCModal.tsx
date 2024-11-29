import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KYCDetails } from "../ui/columns";
import { Button } from "../ui/button";

let verificationData: any | null = null;

const onClickKYCButton = async (id: string) => {
  console.log(id);
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/verification-details/${id}`;
  console.log(apiUrl);
  try {
    console.log("Loading");
    const response = await fetch(apiUrl, { cache: "no-cache" });
    const data = await response.json();
    verificationData = data;
  } catch (error: unknown) {
    console.log(error);
  }
};

const KYCModal = ({ id }: { id: string }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger
          onClick={() => {
            onClickKYCButton(id);
          }}
          asChild
        >
          
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Details</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div>
            {verificationData && (
              <div>
                <h1 className="text-lg">Name</h1>
                <p className="">{verificationData.name}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KYCModal;
