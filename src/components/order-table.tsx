import { flexRender, Table } from "@tanstack/react-table";
import {
  Button,
  StatusBadge,
  StyledPagination,
  StyledTable,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
  TableContainer,
} from "./styles/order-table.styles";
import { IOrder, OrderStatus } from "@/types/order";

export type OrderTableProps = {
  table: Table<IOrder>;
};

export function OrderTable({ table }: OrderTableProps) {
  return (
    <>
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
                    {cell.column.id === "status" ? (
                      <StatusBadge status={cell.getValue<OrderStatus>()} >{cell.getValue<OrderStatus>()}</StatusBadge>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

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
    </>
  );
}
