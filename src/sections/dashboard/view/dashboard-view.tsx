"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IApiResponseData, IOrder } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useDebounce } from "@/hooks/use-debounce";

// Styled components for table, pagination, and search bar
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SearchWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
`;

const StyledTableHead = styled.thead`
  background-color: #f2f2f2;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const StyledTableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`;

const StyledTableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const StyledPagination = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: #f0f0f0;
  }
`;

const TableContainer = styled.div`
  max-height: 500px; // Set a fixed height for the scrollable area
  overflow-y: auto; // Enables vertical scrolling if content overflows
  margin-bottom: 20px; // Adds space below the table
`;

export function DashboardView() {
  const [clinetPagination, setClinetPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchQuery = useDebounce(searchTerm, 1000);

  const fetchOrders = async (
    page: number,
    limit: number,
    search: string
  ): Promise<IApiResponseData> => {
    const res = await fetch(
      `/api/orders?page=${page + 1}&limit=${limit}&search=${search}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }
    return res.json();
  };

  const { data, error, isLoading } = useQuery<IApiResponseData>({
    queryKey: [
      "orders",
      clinetPagination.pageIndex,
      clinetPagination.pageSize,
      searchQuery,
    ],
    queryFn: () =>
      fetchOrders(
        clinetPagination.pageIndex,
        clinetPagination.pageSize,
        searchQuery
      ),
  });

  const orders = data?.data?.orders || [];
  const pagination = data?.data?.pagination || {
    currentPage: 1,
    limit: 10,
    totalPages: 1,
    totalRecords: 0,
  };

  const calculateTimeRemaining = (dueDateTime: string) => {
    const dueDate = dayjs(dueDateTime);
    const now = dayjs();
    const diff = dueDate.diff(now, "hour");
    return diff <= 0 ? "Times up!" : `${diff} hours remaining`;
  };

  const columns = React.useMemo<ColumnDef<IOrder>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "customerName", header: "Customer" },
      { accessorKey: "contentSize", header: "Content Size" },
      { accessorKey: "currentJob", header: "Current Job" },
      {
        accessorKey: "dueDateTime",
        header: "Time Remaining",
        cell: ({ getValue }) => calculateTimeRemaining(getValue<string>()),
      },
      { accessorKey: "status", header: "Status" },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
    columns,
    pageCount: pagination.totalPages,
    state: {
      pagination: clinetPagination,
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setClinetPagination,
  });

  useEffect(() => {
    setClinetPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [searchQuery]);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Title>Order Dashboard</Title>

      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search Orders By Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchWrapper>

      <TableContainer>
        <StyledTable>
          <StyledTableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <StyledTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <StyledTableHeader key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </StyledTableHeader>
                ))}
              </StyledTableRow>
            ))}
          </StyledTableHead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <StyledTableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <StyledTableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      {/* Pagination Controls */}
      <StyledPagination>
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </StyledPagination>
    </Container>
  );
}
