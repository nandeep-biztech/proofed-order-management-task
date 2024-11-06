import { ZodIssue } from "zod";

export function formatZodValidationError(errors: ZodIssue[]): string {
  return errors
    .map((error) => {
      const path = error.path.join('.');
      return `Validation error: ${error.message} at "${path}"`;
    })
    .join('; ');
}
