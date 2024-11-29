import BackButton from "@/components/admin/BackButton";
import ProfileTextCard from "@/components/admin/ProfileTextCard";
import ImageModal from "@/components/shared/ImageModal";
import VerificationButtons from "@/components/shared/VerificationButtons";
import { KYCDetails } from "@/components/ui/columns";
import { IVerification } from "@/types";
import Image from "next/image";
import React, { cache } from "react";

async function getKYCDetails(id: string): Promise<IVerification | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/verification-details/${id}`;
    const response = await fetch(apiUrl, { cache: "reload" });
    const data: IVerification = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("error fetching kyc details", error);
    return null;
  }
}

const VerificationDetails = async ({ params }: { params: { id: string } }) => {
  const data = await getKYCDetails(params.id);
  return (
    <div className="p-10 flex flex-col min-h-[90vh]">
      <div className="mb-5 flex gap-3 items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Verification Details</h1>
      </div>
      {data && (
        <div className="px-10 flex-1">
          <div className="flex justify-between mb-5">
            <ProfileTextCard title="Name" text={data.name} />
            <ProfileTextCard
              title="Verification Type"
              text={data.verificationType}
            />
            <ProfileTextCard title="Document Type" text={data.documentType} />
          </div>
          <div className="flex justify-between gap-10">
            {data.documentType === "Pan Card" && (
              <>
                <ProfileTextCard text={data.panNumber} title="Pan Number" />
                <div>
                  <h2 className="text-xl font-bold mb-3">Pan Image</h2>
                  <ImageModal imageUrl={data.panImage} />
                </div>
              </>
            )}
            {data.documentType === "Aadhar Card" && (
              <>
                <ProfileTextCard
                  text={data.aadharNumber}
                  title="Aadhar Number"
                />
                {data.aadharImage && (
                  <div>
                    <h2 className="text-xl font-bold mb-3">
                      Aadhar Front Image
                    </h2>
                    <ImageModal imageUrl={data.aadharImage[0]} />
                  </div>
                )}
                {data.aadharImage && (
                  <div>
                    <h2 className="text-xl font-bold mb-3">
                      Aadhar Back Image
                    </h2>
                    <ImageModal imageUrl={data.aadharImage[1]} />
                  </div>
                )}
              </>
            )}
            {data.documentType === "Bank Passbook" && (
              <>
                <div className="flex justify-between w-full">
                  <ProfileTextCard
                    text={data.bankAccountNumber}
                    title="Bank Account Number"
                  />
                  <ProfileTextCard text={data.IFSCCode} title="IFSC Code" />
                  <ProfileTextCard text={data.bankName} title="Bank name" />
                  <ProfileTextCard text={data.branchName} title="Branch Name" />
                </div>
                {data.passbookImage && (
                  <div>
                    <h2 className="text-xl font-bold mb-3">Pass Book Image</h2>
                    <ImageModal imageUrl={data.passbookImage} />
                  </div>
                )}
              </>
            )}
            <div>
              {data.liveImage && (
                <div>
                  <h2 className="text-xl font-bold mb-3">Live Image</h2>
                  <ImageModal imageUrl={data.liveImage} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <VerificationButtons
        userid={data && data.userid}
        documentType={data && data.documentType}
        verificationType={data && data.verificationType}
      />
    </div>
  );
};

export default VerificationDetails;
