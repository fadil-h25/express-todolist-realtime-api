import { ZodError } from "zod";
import { FormatZodError } from "../types/format-zod-error";

export function ZodErrorMapper(error: ZodError): FormatZodError[] {
  const formatError = error!.issues.map((issue) => {
    return {
      path: issue.path as string[],
      message: issue.message,
    };
  });

  return formatError;
}
