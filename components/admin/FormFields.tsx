"use client";

import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Cropper from "react-easy-crop";

import NextImage from "next/image";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { FaDeleteLeft, FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/use-toast";

interface FormTextField {
  form: any;
  name: string;
  labelName: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  pattern?: string; 
  inputMode?: string;
  maxLength?: number; 
}


export const FormTextField = ({
  form,
  name,
  labelName,
  placeholder,
  disabled,
}: FormTextField) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex-1">
            <FormLabel>{labelName}</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder && placeholder}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export const FormNumberField = ({ form, name, labelName }: FormTextField) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex-1">
            <FormLabel>{labelName}</FormLabel>
            <FormControl onChange={(e) => {}}>
              <Input
                {...field}
                type="number"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value === undefined ? "" : field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export const FormTextAreaField = ({ form, labelName, name }: FormTextField) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{labelName}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface dateFieldTypes {
  form: any;
  name: string;
  labelName: string;
}

export const FormDateField = ({ form, labelName, name }: dateFieldTypes) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-1 flex-col">
          <FormLabel>{labelName}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface selectFieldTypes {
  form: any;
  name: string;
  labelName: string;
  options: Array<string>;
  placeholder?: string;
}

export const FormSelectField = ({
  form,
  labelName,
  name,
  options,
  placeholder = "",
}: selectFieldTypes) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{labelName}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger value={field.value}>
                <SelectValue placeholder={placeholder}>
                  {field.value}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface FormArraySelectField {
  formOptions: any;
  allTags: string[];
  name: string;
  label: string;
  description: string;
}

// Helper functions to access and set nested properties
const getNestedValue = (obj: any, path: any) =>
  path.reduce((acc: any, part: any) => acc && acc[part], obj);
const setNestedValue = (obj: any, path: any, value: any) => {
  path.reduce((acc: any, part: any, index: any) => {
    if (index === path.length - 1) {
      acc[part] = value;
    } else {
      if (!acc[part]) acc[part] = {};
    }
    return acc[part];
  }, obj);
};

export const FormArraySelectField = ({
  formOptions,
  name,
  allTags,
  label,
  description,
}: FormArraySelectField) => {
  const [unselectedTags, setUnselectedTags] = useState<string[]>(allTags);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [newlySelectedOptions, setNewlySelectedOptions] = useState<string[]>(
    []
  );

  const namePath = name.split(".");

  useEffect(() => {
    const initialSelectedOptions =
      getNestedValue(formOptions._formValues, namePath) || [];
    setSelectedOptions(initialSelectedOptions);
  }, [formOptions, namePath]);

  useEffect(() => {
    setUnselectedTags(allTags.filter((tag) => !selectedOptions.includes(tag)));
  }, [allTags, selectedOptions]);

  const handleAddTag = (tag: string) => {
    setNewlySelectedOptions((oldOptions) => [...oldOptions, tag]);
  };

  const handleSaveChanges = (field: any) => {
    const newSelectedOptions = [...selectedOptions, ...newlySelectedOptions];
    setSelectedOptions(newSelectedOptions);
    setNewlySelectedOptions([]);
    field.onChange(newSelectedOptions);
    setNestedValue(formOptions._formValues, namePath, newSelectedOptions); // Update form values
  };

  const handleRemoveTag = (option: string, field: any) => {
    const newOptions = selectedOptions.filter((value) => value !== option);
    setSelectedOptions(newOptions);
    field.onChange(newOptions);
    setNestedValue(formOptions._formValues, namePath, newOptions); // Update form values
  };

  return (
    <FormField
      control={formOptions.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <FormLabel className="text-base">{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add {label}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[470px]">
                <DialogTitle>{label}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                <FormItem>
                  <ScrollArea className="h-80">
                    <ul className="flex flex-wrap gap-x-10 gap-y-3">
                      {unselectedTags.map((tag, index) => (
                        <li key={`${tag}-${index}`}>
                          <Button
                            className="flex gap-x-2 justify-between hover:bg-transparent profile-text-card"
                            onClick={() => handleAddTag(tag)}
                          >
                            {tag}
                            <FaPlus />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </FormItem>
                <footer>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      onClick={() => handleSaveChanges(field)}
                    >
                      Save changes
                    </Button>
                  </DialogClose>
                </footer>
              </DialogContent>
            </Dialog>
          </div>
          <ul className="flex flex-wrap gap-4">
            {selectedOptions.map((option) => (
              <li key={option}>
                <Button
                  className="flex gap-x-2 justify-between hover:bg-transparent profile-text-card"
                  onClick={() => handleRemoveTag(option, field)}
                >
                  {option}
                  <FaMinus />
                </Button>
              </li>
            ))}
            {selectedOptions.length === 0 && <p>Nothing to show</p>}
          </ul>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface FormCheckBoxFieldProps {
  form: any;
  labelName: string;
  name: string;
}

export const FormCheckBoxField = ({
  form,
  labelName,
  name,
}: FormCheckBoxFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{labelName}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

interface KeywordInputFieldProps {
  formOptions: any;
  name: string;
  label: string;
  description: string;
}

export const KeywordInputField = ({
  formOptions,
  name,
  label,
  description,
}: KeywordInputFieldProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState<string>("");
  const { toast } = useToast();

  const namePath = name.split(".");

  useEffect(() => {
    const initialKeywords =
      getNestedValue(formOptions._formValues, namePath) || [];
    setKeywords(initialKeywords);
  }, []);

  const handleAddKeyword = (field: any) => {
    if (newKeyword.trim() === "" || keywords.includes(newKeyword)) return;
    setKeywords([...keywords, ...newKeyword.split(",")]);
    field.onChange(keywords);
    setNewKeyword("");
  };

  const handleSaveChanges = (field: any) => {
    field.onChange(keywords);
    toast({
      title: "Keywords Saved",
    });
  };

  const handleRemoveKeyword = (keyword: string, field: any) => {
    const newKeywords = keywords.filter((value) => value !== keyword);
    setKeywords(newKeywords);
    field.onChange(newKeywords);
    setNestedValue(formOptions._formValues, namePath, newKeywords); // Update form values
  };

  return (
    <FormField
      control={formOptions.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <div className="flex items-center mb-4">
            <Input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Enter a keyword"
            />
            <Button
              type="button"
              onClick={() => {
                handleAddKeyword(field);
              }}
              className="ml-2"
            >
              <FaPlus />
            </Button>
          </div>
          <ul className="flex flex-wrap gap-4">
            {keywords.map((keyword) => (
              <li key={keyword}>
                <Button
                  className="flex flex-wrap gap-x-2 justify-between hover:bg-transparent profile-text-card"
                  onClick={() => handleRemoveKeyword(keyword, field)}
                >
                  {keyword}
                  <FaMinus />
                </Button>
              </li>
            ))}
            {keywords.length === 0 && <p>Nothing to show</p>}
          </ul>
          <Button
            onClick={() => handleSaveChanges(field)}
            type="button"
            className="mt-4"
          >
            Save changes
          </Button>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};


type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};


interface FormImagesFieldProps {
  formOptions: any;
  name: string;
  username: string;
  userid: string;
}

export const FormImagesField: React.FC<FormImagesFieldProps> = ({
  formOptions,
  name,
  username,
  userid,
}) => {
  const [profileImages, setProfileImages] = useState<string[]>([]);
  const [imageForCrop, setImageForCrop] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

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

  const uploadImage = async (imageBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", imageBlob);
    formData.append("username", username);

    console.log("Uploading image...");
    console.log("Image blob:", imageBlob);
    console.log("Form data:", formData);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`;
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const uploadedImageUrl = data.imageUrl;
        setProfileImages((prevImages) => {
          const newImages = [...prevImages, uploadedImageUrl];
          console.log("Updated profileImages:", newImages); // <-- Add this line
          return newImages;
        });
      } else {
        const data = await response.json();
        console.error("Upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageForCrop(reader.result as string);
      };
    }
  };

  const onCropComplete = async (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImage = (
    imageSrc: string,
    crop: Area,
    outputWidth: number,
    outputHeight: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = outputWidth;
        canvas.height = outputHeight;

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          outputWidth,
          outputHeight
        );

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas toBlob failed"));
          }
        }, "image/jpeg");
      };
      image.onerror = (error) => reject(error);
    });
  };

  const handleCrop = async () => {
    if (croppedAreaPixels && imageForCrop) {
      const croppedImageBlob = await getCroppedImage(
        imageForCrop,
        croppedAreaPixels,
        250, // Desired width
        350  // Desired height
      );
      setCroppedImage(URL.createObjectURL(croppedImageBlob));
    }
  };

  const handleUploadCroppedImage = async () => {
    if (croppedImage) {
      // Convert the URL to a Blob
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      await uploadImage(blob);
      setImageForCrop(null); // Close the crop section after upload
      setCroppedImage(null); // Clear cropped image
    }
  };

  return (
    <>
      <FormField
        control={formOptions.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div>
              <ScrollArea className="max-w-[70vw] h-[400px] whitespace-nowrap rounded-md border">
                <div className="flex flex-wrap w-max gap-4 p-4">
                  {profileImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex relative overflow-hidden rounded-lg edit-image-container"
                    >
                      <Image
                        src={image}
                        alt="Profile Image"
                        width={250}
                        height={350}
                        className="rounded-md object-cover aspect-[7/9]"
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
                  {profileImages.length < 10 && (
                    <div className="w-[250px] cursor-pointer relative flex justify-center items-center aspect-[7/9] border border-black border-dashed rounded-lg">
                      <h2 className="text-3xl">✚</h2>
                      <input
                        type="file"
                        accept="image/*"
                        className="opacity-0 w-full h-full absolute cursor-pointer"
                        onChange={handleFileChange}
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

      {imageForCrop && (
        <div className="fixed flex-col inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative bg-white p-10 rounded-md min-h-[40vh] max-w-lg w-full">
            <Cropper
              image={imageForCrop}
              crop={crop}
              zoom={zoom}
              aspect={7 / 9} // Aspect ratio 7:9
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
           <div className="mt-10 flex gap-4 justify-center">
              <Button
                type="button"
                onClick={handleCrop}
                className="bg-blue-500 text-white"
              >
                Apply Crop
              </Button>
              <Button
                type="button"
                onClick={handleUploadCroppedImage}
                className="bg-green-500 text-white"
              >
                Upload Cropped Image
              </Button>
            </div>
        </div>
      )}
    </>
  );
};

