import type { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import { logger } from "../../logger";

export const RequestContextMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.debug("RequestContextMiddleware() is running");
  req.context = {
    reqId: v4(),
    route: req.path,
    userIp: req.ip || "unknown",
    userId: "guest",
  };

  next();
};
