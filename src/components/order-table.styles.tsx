import styled from "styled-components";

export const TableContainer = styled.div`
  max-height: 500px; // Set a fixed height for the scrollable area
  overflow-y: auto; // Enables vertical scrolling if content overflows
  margin-bottom: 20px; // Adds space below the table
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
`;

export const StyledTableHead = styled.thead`
  background-color: #f2f2f2;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const StyledTableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`;

export const StyledTableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

export const StyledPagination = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
`;

export const Button = styled.button`
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
