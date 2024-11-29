"use client";

import React, { useState, useEffect } from "react";
import { User, userColumns } from "../../../components/ui/columns";
import { DataTable as OriginalDataTable } from "../../../components/ui/data-table";
import { useSearchParams, useRouter } from "next/navigation";

// The `DataTable` expects specific props, we are asserting the type for `onPaginationChange` dynamically here
async function getData(page: number, limit: number, search: string): Promise<{ users: User[], totalUsers: number }> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-users?page=${page}&limit=${limit}&search=${search}`;
  const response = await fetch(apiUrl, { cache: "no-cache" });
  const data = await response.json();
  return data;
}

const Users = () => {
  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Helper function to update the URL search parameters
  const updateSearchParams = (newPage: number, newSearch: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");  // Remove search parameter if empty
    }
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    // Extract search, page, and limit from the URL
    const pageFromUrl = Number(searchParams.get("page") || 0);
    const searchFromUrl = searchParams.get("search") || "";

    setPage(pageFromUrl);
    setSearch(searchFromUrl);
    setLimit(10); // You can adjust the limit here based on your requirements

    const fetchData = async () => {
      const { users, totalUsers } = await getData(pageFromUrl, 10, searchFromUrl);
      setData(users);
      setTotal(totalUsers);
    };

    fetchData();
  }, [searchParams]); // Re-run the effect when the searchParams change (when URL changes)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    updateSearchParams(0, event.target.value);  // Reset page to 0 whenever search changes
  };

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
    updateSearchParams(newPage, search); // Preserve search while changing page
  };

  return (
    <div className="p-5">
     <h2 className="text-2xl font-bold">Users - {total}</h2>

      <OriginalDataTable
        columns={userColumns}
        data={data}
        searchColumn="mobileNumber"
        searchParams={{ page, limit, search }}
        total={total}
        // Assert that the prop types are correct by using `as` keyword here
        onPaginationChange={handlePaginationChange} // This should now not show the red line
      />
    </div>
  );
};

export default Users;
