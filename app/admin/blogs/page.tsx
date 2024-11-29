import React from "react";
import { DataTable } from "../../../components/ui/data-table";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { blogColumns } from "../../../components/ui/columns"
import AddBlogButton from "@/components/admin/AddblogButton";


const Blogs = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const finalParams: {
    page: string | number;
    limit: string | number;
    search: string;
  } = {
    page: searchParams.page || 0,
    limit: searchParams.limit || 10,
    search: searchParams.search || "",
  };

  const response = await fetch(
    // `http://localhost:3009/get-blogs?page=${finalParams.page}&limit=${finalParams.limit}&search=${finalParams.search}`,
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-blogs?page=${finalParams.page}&limit=${finalParams.limit}&search=${finalParams.search}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return (
    <div className="p-5">
      <SpeedInsights />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Blogs - {data.totalBlogs}</h2>
        <AddBlogButton />
      </div>
      {data && (
        <DataTable
          columns={blogColumns}
          data={data.blogs}
          searchParams={finalParams}
          total={data.totalBlogs}
          searchColumn="title"
        />
      )}
    </div>
  );
};

export default Blogs;
