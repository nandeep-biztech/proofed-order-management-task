import { DEFAULT_API_PAGINATION } from "@/constants/comman";
import { z as zod } from "zod";

export const ListOrderQuerySchema = zod.object({
  search: zod.string().optional(),
  page: zod
  .string()
  .transform((val) => (val ? parseInt(val, 10) : DEFAULT_API_PAGINATION.page))
  .refine((val) => val === undefined || val > 0, {
    message: 'Page must be at least 1',
  }),
  limit: zod
    .string()
    .transform((val) => (val ? parseInt(val, 10) : DEFAULT_API_PAGINATION.limit))
    .refine((val) => val === undefined || (val > 0 && val <= 100), {
      message: "Limit must be between 1 and 100",
    }),
});

export type ListOrderQuerySchemaType = zod.infer<typeof ListOrderQuerySchema>;
