import type { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";

export const RequestContextMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.context = {
    reqId: v4(),
    route: req.path,
    userIp: req.ip || "unknown",
    userId: "guest",
  };

  next();
};
