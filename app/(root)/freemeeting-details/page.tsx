import React from 'react';
import DownloadAppModalForView from '@/components/shared/DownloadAppModelForvewDetails';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const FreeMeetingDetails = () => {
  return (
    <div className="flex  justify-center bg-white">
      <div className="flex flex-col items-center justify-center p-4">
        <Image
          src="https://res.cloudinary.com/merndeveloper/image/upload/v1724841315/booking_gu7x7z.png"
          alt="Success Logo"
          width={300} 
          height={300} 
          className="rounded-[50%] md:max-w-full sm:h-[50%] md:h-[80%] object-contain"
        />
         <p className="text-lg font-semibold  xl:text-xl min-[1440px]:text-2xl min-[1440px]:w-full">
            Your Meeting has been is Booked Successfully.
              </p>
               <DownloadAppModalForView>
              <div className="border-gradient  mt-2">
                <Button className="login-button">View meeting details</Button>
              </div>
            </DownloadAppModalForView>
      </div>
    </div>
  );
};

export default FreeMeetingDetails;
