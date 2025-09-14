import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/CustomError.js";
import { ResponseErrorBody } from "../types/response/response-error-body.js";
import { logger } from "../logger/index.js";
import { ZodError } from "zod";
import { ZodErrorMapper } from "../helper/zod-error-mapper.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const ErrorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    logger.debug(`Error catch CustomError`);
    const responseErrorBody: ResponseErrorBody = {
      success: err.success,
      message: err.message,
    };
    return res.status(err.statusCode).json(responseErrorBody);
  } else if (err instanceof ZodError) {
    logger.debug(`Error catch ZodError`);
    const responseErrorBody: ResponseErrorBody = {
      success: false,
      message: "Validation Error",
      errors: ZodErrorMapper(err),
    };
    return res.status(400).json(responseErrorBody);
  } else if (err instanceof PrismaClientKnownRequestError) {
    logger.debug(`Error catch PrismaClientKnownRequestError `, err);
    let responseErrorBody: ResponseErrorBody | null;
    let message: string | null;

    switch (err.code) {
      case "P2025": // Record not found
        const modelName = err.meta?.modelName || "Record";
        responseErrorBody = {
          message: `${modelName} not found`,
          success: false,
        };
        return res.status(404).json(responseErrorBody);

      case "P2002": // Unique constraint failed
        const targetField = err.meta?.target || "field";
        responseErrorBody = {
          message: `Duplicate value for ${targetField}`,
          success: false,
        };
        return res.status(400).json(responseErrorBody);

      case "P2003": // Foreign key constraint failed
        responseErrorBody = {
          message: `Cannot perform operation due to related records`,
          success: false,
        };
        return res.status(400).json(responseErrorBody);

      default:
        // Prisma error lain
        responseErrorBody = {
          message: `Prisma error: ${err.message}`,
          success: false,
        };
        return res.status(500).json(responseErrorBody);
    }
  } else {
    logger.error(`Unhandled Error: ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
