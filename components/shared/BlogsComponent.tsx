"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  _id: string;
  id: string;
  title: string;
  author: string;
  readtime: string;
  content: string;
  image?: string; // Assuming there's an image field
  publishedDate: string;
  category: string;
}

const slugify = (title: string) => {
  return title.trim().replace(/\s+/g, "_"); // Replace spaces with '_' while preserving hyphens
};

const BlogsComponent = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      console.log("blogs fetched called");
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-allblogs`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data.blogs);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(blogs);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs &&
        blogs
          .slice()
          .reverse()
          .map((blog) => (
            <Link href={`/blogs/${slugify(blog.title)}`} key={blog.id}>
              <div className="p-4 rounded-lg h-auto shadow-lg bg-white transition-transform transform hover:scale-105">
                <Image
                  src={blog.image || "/default-image.jpg"} // Placeholder for blogs without images
                  alt={blog.title}
                  className="w-full object-cover rounded-md mb-4"
                  width={1920}
                  height={1080}
                />
                <div className="text-sm flex mb-2 items-center">
                  <div className="rounded-full bg-black">
                    <Image
                      src="/assets/icons/goformeet.png"
                      alt="logo"
                      className="rounded-full p-3"
                      width={40}
                      height={40}
                    />
                  </div>
                  <span className="ml-2 font-bold text-gray-400">
                    {blog.author}
                  </span>
                </div>
                <h2 className="font-bold text-lg text-left overflow-hidden text-ellipsis line-clamp-2">
                  {blog.title}
                </h2>

                <div className="text-sm flex mb-2 items-center">
                  <span className="font-[400] text-gray-400 mr-2">
                    {new Date(blog.publishedDate)
                      .toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short", // "Sep"
                        day: "2-digit",
                      })
                      .replace(",", "-")}
                  </span>
                  <li className="text-gray-400 ml-2">
                    <span className="font-[400]">{`${blog.readtime} Read`}</span>
                  </li>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default BlogsComponent;
