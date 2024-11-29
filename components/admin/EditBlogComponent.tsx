"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { toast, useToast } from "../ui/use-toast";
import { FormTextField, KeywordInputField } from "./FormFields";
import { FormImagesFieldforBlog } from "./AddblogImageCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IBlog } from "@/types";

// Define your Zod schema for the blog
const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z.any().optional(),
   keywords: z.array(z.string()),
});

const EditBlogComponent = ({ blog }: { blog: IBlog }) => {
  const [open3, setOpen3] = useState(false); // Final Confirmation modal
  const { toast } = useToast();
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog.title,
      content:blog.content,
      image: blog.image,
      keywords:blog.keywords
    },
  });
    const blogId = blog.id;
async function onSubmit(values: z.infer<typeof blogSchema>) {
    const image = Array.isArray(values.image) ? values.image[0] : values.image;
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/edit-blog/${blogId}`
  // const apiUrl = `http://localhost:3009/edit-blog/${blogId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        content: values.content,
        image: image, // Use the single string image URL
        keywords: values.keywords
      }),
    });

    if (response.ok) {
      const data = await response.json();
      toast({
        title: "Blog Edited successfully",
      });
    } else {
      const error = await response.json();
      toast({
        variant: "destructive",
        title: "Failed to Edit Blog",
        description: error.message,
      });
      throw new Error("Failed to Edit Blog");
    }
  } catch (err: any) {
    toast({
      variant: "destructive",
      title: "Failed to Edit Blog",
      description: err.message,
    });
    console.error("Failed to Edit Blog:", err);
  } finally {
    setOpen3(false); // Hide the confirmation modal after submission
  }
}
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            // Open the confirmation dialog
            setOpen3(true);
          })}
          className="px-10 space-y-8"
        >
          <h1 className="font-bold text-xl mb-3 text-center">Blog Details</h1>
          <FormTextField
            form={form.control}
            name="title"
            labelName="Title"
            placeholder="Enter Blog Title"
          />

          <FormImagesFieldforBlog
            formOptions={form.control}
            name="image"
            userid="" // You might want to pass the user ID here if needed
            username="username" // You might want to pass the username here if needed
          />

          <div className="mt-3">
            <h3 className="font-bold text-xl mb-3">Content</h3>
            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write your blog content here..."
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                      ['clean'],
                    ],
                  }}
                />
              )}
            />
          </div>
           <div className="mt-3">
            <KeywordInputField
              name="keywords"
              label="Blog Keywords"
              description="Add keywords that needs to be shown in Blog"
              formOptions={form.control}
            />
          </div>
          <Button type="submit" className="ml-auto">
            Submit
          </Button>
        </form>
      </Form>

      <Dialog open={open3} onOpenChange={setOpen3}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to save the changes?
          </DialogDescription>
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => {
                  form.handleSubmit(onSubmit)(); // Manually trigger form submission
                  setOpen3(false); // Close the confirmation modal after submission
                }}
              >
                Yes
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button">No</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBlogComponent;
