import Link from "next/link";
import React from "react";
import parse from "html-react-parser";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Blog {
  _id: string;
  title: string;
  id: string;
  keywords: [];
  keyword: string;
  author: string;
  readtime: string;
  content: string;
  image?: string;
  publishedDate: string;
  category: string;
}

const slugify = (title: string) => {
  return title.trim().replace(/\s+/g, "_"); // Replace spaces with '--' while preserving hyphens
};

interface BlogResponse {
  blogs: Blog[];
}

async function getBlog(blogTittle: string): Promise<Blog | null> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-blog/${blogTittle}`;
  // const apiUrl = `http://localhost:3009/get-blog/${blogTittle}`;
  try {
    const response = await fetch(apiUrl, { cache: "no-cache" });
    if (!response.ok) {
      console.error("Failed to fetch blog data");
      return null;
    }
    const data: Blog = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

async function getRelatedBlogs(): Promise<Blog[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-allblogs`;
  try {
    const response = await fetch(apiUrl, { cache: "no-cache" });
    if (!response.ok) {
      console.error("Failed to fetch related blogs");
      return [];
    }
    const data: BlogResponse = await response.json();
    return data.blogs;
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
}

const BlogItem = async ({ params }: { params: { blogTittle: string } }) => {
  const { blogTittle } = params;
  const formattedTitle = blogTittle.replace(/_/g, " "); // Convert - back to spaces
  const blogData = await getBlog(formattedTitle);
  let relatedBlogs = await getRelatedBlogs();

  if (!blogData) {
    return <div>Error loading blog</div>;
  }

  // Filter out the current blog from the related blogs
  relatedBlogs = relatedBlogs.filter(
    (relatedBlog) => relatedBlog._id !== blogData._id
  );

  const { title, author, readtime, content, image, publishedDate, keywords } =
    blogData;
  console.log(image);

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main Blog Section - 60% */}
        <div className="lg:col-span-3 lg:pl-32">
          {/* Author, Logo, Date, Read Time */}
          <div className="flex items-center mb-4">
            <Image
              src="https://res.cloudinary.com/merndeveloper/image/upload/v1725703731/goformeet_logo_png_rs6vb8.png"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
              width={10}
              height={10}
            />
            <div className="ml-4">
              <p className="font-bold text-gray-600">{author}</p>
              <span className="text-gray-500 text-sm">
                {new Date(publishedDate)
                  .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })
                  .replace(",", "-")}{" "}
                &bull; {`${readtime} Read`}
              </span>
            </div>
          </div>

          {/* Blog Title */}
          <h1 className="font-bold text-2xl mb-4">{title}</h1>

          {/* Blog Image */}
          <div className="mb-6">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={image || "/default-image.jpg"}
                alt={title}
                className="w-full h-full object-cover rounded-lg shadow-md p-2"
                width={1920}
                height={1080}
              />
            </AspectRatio>
          </div>

          {/* Blog Content */}
          <div className="prose max-w-none">{parse(content)}</div>
          <section className=" mt-4">
            <h3 className="text-2xl font-bold mb-4">Keywords</h3>
            <ul className="flex gap-3 flex-wrap">
              {keywords &&
                keywords.map((keyword: string) => (
                  <li className="profile-text-card text-sm" key={keyword}>
                    {keyword}
                  </li>
                ))}
            </ul>
          </section>
        </div>

        {/* Related Blogs Section - 40% */}
        <div className="lg:col-span-2 lg:pr-28">
          <Image
            src="https://res.cloudinary.com/merndeveloper/image/upload/v1725534685/relatedblogimage_ogp3oq.png"
            alt="relatedBlogs"
            className="p-6"
            width={500}
            height={500}
          />
          <h2 className="font-bold text-xl pl-6 mb-4">Related Blogs</h2>
          <div className="space-y-4 pl-6 w-[94%]">
            {relatedBlogs.map((relatedBlog) => (
              <Link
                href={`/blogs/${slugify(relatedBlog.title)}`}
                key={relatedBlog._id}
              >
                <div className="flex flex-col justify-center mt-3 p-4 bg-white shadow-md rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="font-[400] text-md text-left overflow-hidden text-ellipsis line-clamp-2">
                    {relatedBlog.title}
                  </h3>
                  <div className="flex">
                    <Image
                      src="https://res.cloudinary.com/merndeveloper/image/upload/v1725703731/goformeet_logo_png_rs6vb8.png"
                      alt="Logo"
                      className="h-10 w-10 rounded-full object-cover"
                      width={10}
                      height={10}
                    />
                    <div className="ml-4">
                      <p className="font-bold pt-[2] text-gray-600">
                        {relatedBlog.author}
                      </p>
                      <span className="text-gray-500 text-sm">
                        {new Date(relatedBlog.publishedDate)
                          .toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })
                          .replace(",", "-")}{" "}
                        &bull; {`${relatedBlog.readtime} Read`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
