import React, { useState, useEffect } from "react";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface FormImagesFieldProps {
  formOptions: any;
  name: string;
  username: string;
  userid: string;
}

export const FormImagesFieldforBlog: React.FC<FormImagesFieldProps> = ({
  formOptions,
  name,
  username,
}) => {
  const [profileImages, setProfileImages] = useState<string[]>([]);

  useEffect(() => {
    const initialImages =
      formOptions._formValues.personalDetails?.profileImages || [];
    if (initialImages) {
      setProfileImages(initialImages);
    }
  }, [formOptions, name]);

  const deleteImage = async (index: number, field: any) => {
    const newImages = profileImages.filter((_, i) => i !== index);
    setProfileImages(newImages);
    field.onChange(newImages);
  };

  const addImage = async (e: any, field: any) => {
    const image = e.target.files[0];
    if (!image) {
      console.error("No file selected");
      return;
    }

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`;
      // const apiUrl = `http://localhost:3009/upload`;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("username", username);

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.imageUrl;
        const newImages = [...profileImages, imageUrl];
        setProfileImages(newImages);
        field.onChange(newImages);
      } else {
        const data = await response.json();
        console.error("Error message:", data.message);
        console.error("Something went wrong while uploading the image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <FormField
      control={formOptions.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div>
            <ScrollArea className="max-w-[40vw] h-[100px] whitespace-nowrap rounded-md border">
              <div className="flex flex-wrap justify-center items-center w-full gap-2 p-2">
                {profileImages.map((image, index) => (
                  <div
                    key={index}
                    className="flex relative overflow-hidden rounded-md edit-image-container"
                  >
                    <Image
                      src={image}
                      alt="Profile Image"
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                    <div className="absolute bg-black w-full h-full opacity-60 hidden delete-container">
                      <Button
                        type="button"
                        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute rounded-full opacity-100"
                        onClick={() => deleteImage(index, field)}
                      >
                        <FaTrash className="text-white" />
                      </Button>
                    </div>
                  </div>
                ))}
                {profileImages.length < 5 && (
                  <div className="w-[200px] cursor-pointer h-10 relative flex justify-center items-center border border-black border-dashed rounded-md">
                    <h2 className="text-xl">✚</h2>
                    <input
                      type="file"
                      accept="image/*"
                      className="opacity-0 w-full h-full absolute cursor-pointer"
                      onChange={(e) => addImage(e, field)}
                    />
                  </div>
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
