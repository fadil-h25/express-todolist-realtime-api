import { NextFunction, Request, Response } from "express";
import { userServiceInstance } from "./user-service";
import { ResponseBody } from "../../types/response/response";

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
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
