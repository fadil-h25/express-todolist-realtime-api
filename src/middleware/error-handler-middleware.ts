import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/CustomError";
import { ResponseErrorBody } from "../types/response/response-error-body";
import { logger } from "../logger";
import { ZodError } from "zod";
import { ZodErrorMapper } from "../helper/zod-error-mapper";

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
  } else {
    logger.error(`Unhandled Error: ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
