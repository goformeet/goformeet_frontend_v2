import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const UserReviews = () => {
  return (
    <div className="custom-container bg-[#F9DCD4] lg:h-screen flex flex-col lg:flex-row items-center py-20">
      <h2 className="font-bold text-3xl lg:text-4xl xl:text-5xl mb-4 lg:mb-2 text-center lg:hidden">
        What Our <span className="text-[#E03300]">Users</span> Say
      </h2>
      <Carousel className="w-[80%] lg:w-full lg:px-24">
        <CarouselContent>
          <CarouselItem>
            <div className="lg:flex items-center gap-20">
              <div className="relative">
                <div className="absolute w-fit rounded-md bg-[#F6BFB0] h-full ml-[10%] z-[2] lg:w-4/5 hidden lg:block"></div>
                <div className="relative bg-[#E03300] w-fit mx-auto order-2 p-5 lg:my-12 z-[5]">
                  <Image
                    src="/assets/images/userReview.jpeg"
                    alt="User Image"
                    width={300}
                    height={400}
                  />
                  <h2 className="text-lg text-white text-center mt-5 font-bold">
                    Sophie Jain
                  </h2>
                  <p className="text-white text-center">Actress</p>
                </div>
              </div>
              <div className="flex-1 mx-auto h-fit">
                <h2 className="font-bold mb-8 hidden lg:block text-center lg:text-3xl xl:text-4xl">
                  What Our <span className="text-[#E03300]">Users</span> Say
                </h2>
                <p className="text-justify mt-4 w-full mx-auto">
                  As an actress, my schedule is always packed with auditions,
                  rehearsals, and meetings with directors and producers.
                  #Goformeet has been a game-changer for managing my busy
                  calendar.Thanks to #Goformeet, I can focus more on my craft
                  and less on logistical headaches. I highly recommend it to
                  anyone in the entertainment industry!
                </p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>{" "}
    </div>
  );
};
export default UserReviews;
