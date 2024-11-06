import { NextResponse } from "next/server";
import { ListOrderQuerySchema } from "@/schemas/order.schema";
import { StatusCodes } from "@/utils/status-codes";
import { formatZodValidationError } from "@/utils/helper";
import { orders } from "@/_mock/order";
import { ApiResponseData } from "@/types/order";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const { error, data , success } =
      ListOrderQuerySchema.safeParse(queryParams);

    if (!success) {
      const validationError = formatZodValidationError(error.errors);

      return NextResponse.json(
        { message: validationError },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const {page, limit, search} = data

    const allOrders = orders;
    const filteredOrders = search
      ? allOrders.filter(order =>
          order.customerName.toLowerCase().includes(search.toLowerCase())
        )
      : allOrders;

      const totalRecords = filteredOrders.length;
      const totalPages = Math.ceil(totalRecords / limit);
      const currentPage = Math.min(page, totalPages); // Prevent page overflow
      const startIndex = (currentPage - 1) * limit;
      const paginatedOrders = filteredOrders.slice(startIndex, startIndex + limit);

       // Build the response
       const response = {
        message: 'Orders fetched successfully',
        data: {
          orders: paginatedOrders,
          pagination: {
            currentPage,
            limit,
            totalPages,
            totalRecords,
          },
        },
      };

    return NextResponse.json<ApiResponseData>(response, { status: StatusCodes.OK });
  } catch (error) {
    console.error("🚀 ~ GET ~ error:", error)
    return NextResponse.json(
      { message: "Somthing went wrong" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
