import type { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";

export const RequestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = v4();
  req.requestId = requestId;

  next();
};
