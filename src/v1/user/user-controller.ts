import { NextFunction, Request, Response } from "express";
import { userServiceInstance } from "./user-service.js";
import { ResponseBody } from "../../types/response/response.js";
import { logger } from "../../logger/index.js";
import { generateLogMetaData } from "../../helper/generate-log-meta-data.js";

const serviceName = "user-controller";
const domainName = "user";

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.debug(
      "updateUser() running",
      generateLogMetaData(
        req.context.reqId,
        req.context.route,
        domainName,
        serviceName
      )
    );

    const updatedUser = await userServiceInstance.updateUser(
      req.context,
      req.body
    );

    const responseBody: ResponseBody = {
      message: "User updated successfully",
      data: updatedUser,
      success: true,
    };

    return res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
}
