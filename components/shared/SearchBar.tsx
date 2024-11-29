"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Dynamically navigate on input change
    router.push(`/hosts?search=${newQuery}`);
  };

  return (
    <div className="justify-center items-center bg-[#a92600] rounded-full pl-3 flex">
      <FaSearch className="text-white" />
      <input
        type="search"
        className="py-2 px-3 w-full xl:w-full text-white placeholder:text-white rounded-full bg-[#a92600] outline-none border-none"
        placeholder="Search Experts"
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
