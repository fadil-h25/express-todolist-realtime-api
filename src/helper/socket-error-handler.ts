import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { prismaErrorMapper } from "./prisma-error-mapper.js";
import { ZodErrorMapper } from "./zod-error-mapper.js";
import { ResponseErrorBody } from "../types/response/response-error-body.js";
import { logger } from "../logger/index.js";

export function socketErrorHandler(err: unknown): ResponseErrorBody {
  logger.debug("socketErrorMapper running()");
  if (err instanceof PrismaClientKnownRequestError) {
    return prismaErrorMapper(err);
  } else if (err instanceof ZodError) {
    const errors = ZodErrorMapper(err);
    return {
      message: "Invalid input",
      success: false,
      errors,
    };
  } else if (err instanceof Error) {
    return {
      message: err.message || "Internal error",
      success: false,
    };
  } else {
    logger.warn("Catch uknown error ", err);
    return {
      message: "Internal error",
      success: false,
    };
  }
}
