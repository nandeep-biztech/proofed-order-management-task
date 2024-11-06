export enum Job {
  Service = "Service",
  Review = "Review",
  Return = "Return",
}

export enum OrderStatus {
  InQueue = "in_queue",
  OnHold = "on_hold",
  Offer = "offer",
  Assign = "assign",
}

export interface IOrder{
  id: string;
  customerName: string;
  contentSize: number;
  currentJob: Job; // If the currentJob can have more values, expand this union
  dueDateTime: string; // ISO string
  status: OrderStatus; // To ensure it matches one of the statuses defined in ORDER_STATUS_LABELS
};

export interface PaginationType {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

export interface ApiResponseData {
  message: string;
  data: {
    orders: IOrder[];
    pagination: PaginationType
  };
};