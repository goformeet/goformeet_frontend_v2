import AddblogComponent from "@/components/admin/Addblogcomponent";
import BackButton from "@/components/admin/BackButton";
import React from "react";

const AddBlog = async () => {
  return (
    <div className="p-10 w-full">
        <div className="mb-5 flex gap-3 items-center">
        <BackButton/>
        <h1 className="text-2xl">
         Addblog
        </h1>
      </div>
       <AddblogComponent/>
    </div>
  );
};

export default AddBlog;
