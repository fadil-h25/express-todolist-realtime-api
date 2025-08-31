import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/CustomError.js";
import { logger } from "../logger/index.js";

export const AdminOnlyRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug("AdminOnlyRequestMiddleware() is running");
    const context = req.context;

    if (context.role != "ADMIN") throw new CustomError("Access Denied", 403);
  } catch (error) {
    next(error);
  }
};

export const UserOnlyRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug("UserOnlyRequestMiddleware() is running");
    const context = req.context;

    if (context.role != "USER") throw new CustomError("Access Denied", 403);
  } catch (error) {
    next(error);
  }
};
