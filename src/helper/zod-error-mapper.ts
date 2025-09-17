import { ZodError } from "zod";
import { FormatZodError } from "../types/format-zod-error.js";
import { logger } from "../logger/index.js";

export function ZodErrorMapper(error: ZodError): FormatZodError[] {
  logger.debug("zodErrorMapper running()");
  const formatError = error!.issues.map((issue) => {
    return {
      path: issue.path as string[],
      message: issue.message,
    };
  });

  return formatError;
}
