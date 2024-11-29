import React from "react";
import { hostColumns } from "../../../components/ui/columns";
import { DataTable } from "../../../components/ui/data-table";

const Guests = async ({
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-guests?page=${finalParams.page}&limit=${finalParams.limit}&search=${finalParams.search}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Guests - {data.totalGuests}</h2>
      {data && (
        <DataTable
          columns={hostColumns}
          data={data.guests}
          searchParams={finalParams}
          total={data.totalGuests}
          searchColumn="name"
        />
      )}
    </div>
  );
};

export default Guests;
