import { ZodIssue } from "zod";
import dayjs from "dayjs";

export function formatZodValidationError(errors: ZodIssue[]): string {
  return errors
    .map((error) => {
      const path = error.path.join('.');
      return `Validation error: ${error.message} at "${path}"`;
    })
    .join('; ');
}

export function calculateTimeRemaining(dueDateTime: string) {
  const dueDate = dayjs(dueDateTime);
  const now = dayjs();
  const diff = dueDate.diff(now, "hour");
  return diff <= 0 ? "Times up!" : `${diff} hours remaining`;
}
