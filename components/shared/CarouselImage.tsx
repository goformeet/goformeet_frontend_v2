"use client"

import Image from "next/image";
import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { AspectRatio } from "../ui/aspect-ratio";



const CarouselImage = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);


  const prev = () =>
    setCurrentImage((curr) => (curr === 0 ? images.length - 1 : curr - 1))
  const next = () =>
    setCurrentImage((curr) => (curr === images.length - 1 ? 0 : curr + 1))


  return (
    <div className="carousel-image-container">
      <div>
        <Image alt="" src="/assets/icons/like.svg" className="like-icon" width={40} height={40} />
      </div>
      <div className="slides-container">
        <AspectRatio ratio={9 / 7}>
        <Image
          src={images[currentImage]}
          alt="carousel image"
          width={400}
          height={400}
          objectFit="cover"
          className="rounded-lg"
        />
        </AspectRatio>
      </div>
      <div className="carousel-buttons-container">
        <button
          className="carousel-button"
          onClick={prev}
        >
          <FaAngleLeft size={20} />
        </button>
        <button
          className="carousel-button"
          onClick={next}
        >
          <FaAngleRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CarouselImage;
