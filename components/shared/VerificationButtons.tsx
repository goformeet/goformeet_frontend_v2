"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { verifyDetails } from "@/lib/verfication";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const VerificationButtons = ({
  userid,
  documentType,
  verificationType,
}: {
  userid: string | null;
  documentType: string | null;
  verificationType: string | null;
}) => {
  const router = useRouter();

  const onClickApprove = async () => {
    const status = await verifyDetails(
      "Accepted",
      userid,
      documentType,
      verificationType
    );
    router.back();
  };

  const onClickReject = async () => {
    const status = await verifyDetails(
      "Rejected",
      userid,
      documentType,
      verificationType
    );
    router.back();
  };
  return (
    <div className="flex gap-5 justify-end">
      <Button className="bg-green-500" onClick={onClickApprove}>
        Approve
      </Button>
      <Button className="bg-[#E03320]" onClick={onClickReject}>
        Reject
      </Button>
    </div>
  );
};

export default VerificationButtons;
