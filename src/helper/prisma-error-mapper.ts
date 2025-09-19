import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { logger } from "../logger/index.js";
import { ResponseErrorBody } from "../types/response/response-error-body.js";

export function prismaErrorMapper(
  err: PrismaClientKnownRequestError
): ResponseErrorBody {
  logger.debug("prismaErrorMapper running()");

  switch (err.code) {
    case "P2025": // Record not found
      const modelName = err.meta?.modelName || "Record";
      return {
        message: `${modelName} not found`,
        success: false,
      };

    case "P2002": // Unique constraint failed
      const targetField = Array.isArray(err.meta?.target)
        ? err.meta.target.join(", ")
        : err.meta?.target || "field";
      return {
        message: `Duplicate value for ${targetField}`,
        success: false,
      };

    case "P2003": // Foreign key constraint failed
      return {
        message: `Cannot perform operation due to related records`,
        success: false,
      };

    default:
      logger.warn("catch unhandle prismaClientRequestError ", err);
      return {
        message: `Prisma error: ${err.message}`,
        success: false,
      };
  }
}
