"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";

interface SearchParams {
  page?: string | number | undefined;
  limit?: string | number | undefined;
  search?: string | number | undefined;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]; 
  data: TData[];
  searchParams?: SearchParams;
  total?: number; 
  searchColumn: string;
  onPaginationChange?: (newPage: number) => void;
  onSearchChange?: (newSearch: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchColumn,
  searchParams,
  total,
}: DataTableProps<TData, TValue>) {
  const itemsPerPage = 10; // Set the number of items per page
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [searchValue, setSearchValue] = React.useState<string>(searchParams?.search?.toString() || "");
  const [pageInput, setPageInput] = React.useState<number>(Number(searchParams?.page) || 1); // Page input state
  const searchParamsObj = useSearchParams();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParamsObj);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    params.set("page", "0"); // Reset to the first page on new search
    router.push(`?${params.toString()}`);
  }, [searchValue]);

  // Calculate total pages
  const totalPages = Math.ceil((total || 0) / itemsPerPage);
  const currentPage = Number(searchParams?.page) || 0;

  const handleGoToPage = () => {
    const page = Math.max(0, Math.min(totalPages - 1, pageInput - 1)); // Ensure valid page range
    router.push(`?page=${page}&limit=${searchParams?.limit}&search=${searchParams?.search}`);
  };

  return (
    <div className="bg-white my-4 mx-5 p-5 rounded-md">
      <div className="flex items-center justify-end py-4">
        <Input
          placeholder={`Search ${searchColumn}...`}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="text-center"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        {/* Left Side: Page Info */}
        <div>
          Page {currentPage + 1} of {totalPages}
        </div>
        
        {/* Center: Search Input */}
        <div className="flex-grow flex justify-center">
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={pageInput}
            onChange={(e) => setPageInput(Number(e.target.value))}
            className="w-20 mx-2"
          />
          <Button variant="outline" size="sm" onClick={handleGoToPage}>
            Go
          </Button>
        </div>
        
        {/* Right Side: Previous and Next Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (!searchParams) {
                table.previousPage();
              } else {
                router.push(
                  `?page=${Math.max(0, currentPage - 1)}&limit=${searchParams?.limit}&search=${searchParams?.search}`
                );
              }
            }}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (!searchParams) {
                table.nextPage();
              } else {
                router.push(
                  `?page=${Math.min(totalPages - 1, currentPage + 1)}&limit=${searchParams?.limit}&search=${searchParams?.search}`
                );
              }
            }}
            disabled={currentPage >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
