import { OrderStatus } from "@/types/order";

export const ORDER_STATUS_LABELS = {
  [OrderStatus.InQueue]: "in queue",
  [OrderStatus.OnHold]: "on hold",
  [OrderStatus.Offer]: "offer",
  [OrderStatus.Assign]: "assign",
} as const;

