import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/CustomError";
import { ResponseErrorBody } from "../types/response/response-error-body";
import { logger } from "../logger";

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
      errors: err.errors,
    };
    return res.status(err.statusCode).json(responseErrorBody);
  } else {
    logger.error(`Unhandled Error: ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
