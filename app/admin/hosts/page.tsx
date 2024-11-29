import React, { useState, useEffect } from "react";
import { hostColumns } from "../../../components/ui/columns";
import { DataTable } from "../../../components/ui/data-table";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AddProfilebutton from "@/components/admin/AddProfileButto";

interface Host {
  _id: string;
  slno: number;
  personalDetails: {
    name: string;
    profession: string;
    mpbileNumber: string;
    city: string;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const Hosts = async ({
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

  console.log(finalParams)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-hosts?page=${finalParams.page}&limit=${finalParams.limit}&search=${finalParams.search}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return (
    <div className="p-5">
      <SpeedInsights />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Experts - {data.totalHosts}</h2>
        <AddProfilebutton/>
      </div>
      {data && (
        <DataTable
          columns={hostColumns}
          data={data.hosts}
          searchParams={finalParams}
          total={data.totalHosts}
          searchColumn="name"
        />
      )}
    </div>
  );
};

export default Hosts;
