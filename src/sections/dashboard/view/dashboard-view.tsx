"use client";

import React, { useEffect, useState } from "react";
import { IApiResponseData, IOrder } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useDebounce } from "@/hooks/use-debounce";
import { OrderTable } from "@/components/order-table";
import { Container, SearchInput, SearchWrapper, Title } from "@/components/styles/dashboard-view.styles";
import Loading from "@/app/loading";


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

  if (isLoading) return <Loading/>;
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

      <OrderTable  table={table} />
      
    </Container>
  );
}
