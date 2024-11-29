"use client";

import React from "react";
import { Button } from "../ui/button";
import {useRouter } from "next/navigation";

const AddBlogButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/admin/blogs/add-blog`);
      }}
    >
      Add Blogs
    </Button>
  );
};

export default AddBlogButton;
