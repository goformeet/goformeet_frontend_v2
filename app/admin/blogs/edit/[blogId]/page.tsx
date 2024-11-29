import BackButton from "@/components/admin/BackButton";
import EditBlogComponent from "@/components/admin/EditBlogComponent";
import { IBlog } from "@/types";
import React from "react";

async function getBlog(blogId: string): Promise<IBlog | null> {  // Return null if fetch fails
  console.log("calling requeired blog api");
   console.log(blogId)
      // const apiUrl = `http://localhost:3009/get-blogbyid/${blogId}`;
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-blogbyid/${blogId}`
  try {
    const response = await fetch(apiUrl, { cache: "no-cache" });
    if (!response.ok) {
      console.error("Failed to fetch blog data");
      return null;
    }
    const data: IBlog = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

const EditBlog = async ({ params }: { params: { blogId: string } }) => {
    const { blogId } = params;
  const blog = await getBlog(blogId);
  if (!blog) {
    return <div>Error: Blog not found or failed to load.</div>;
  }

  // Safely access content and title
  return (
    <div className="p-10 w-full">
      <div className="mb-5 flex gap-3 items-center">
        <BackButton />
        <h1 className="text-2xl">
          Edit Blog: 
        </h1>
      </div>
      <EditBlogComponent blog={blog} />
    </div>
  );
};

export default EditBlog;
