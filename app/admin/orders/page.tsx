import React, { useState, useEffect } from "react";
import {  orderColumns } from "../../../components/ui/columns";
import { DataTable } from "../../../components/ui/data-table";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Meetings = async ({
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
  console.log(finalParams);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/meetings?page=${finalParams.page}&limit=${finalParams.limit}&search=${finalParams.search}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return (
    <div className="p-5">
      <SpeedInsights />
      <h2 className="text-2xl font-bold">Orders & Payments - {data.totalMeetings}</h2>
      {data && (
        <DataTable
          columns={orderColumns}
          data={data.meetings}
          searchParams={finalParams}
          total={data.totalMeetings}
          searchColumn="name"
        />
      )}
    </div>
  );
};

export default Meetings;
