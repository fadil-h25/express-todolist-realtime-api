import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/CustomError.js";
import { logger } from "../logger/index.js";
import "../config/load-env.js";
export const AuthRequestiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug("AuthRequestMiddleware() is running");
    const accessToken = req.cookies["access_token"];
    if (!accessToken) throw new CustomError("Invalid token", 401);

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error("Secret key is null");

    const payload = jwt.verify(accessToken, secretKey, {});
    if (!payload) throw new CustomError("Invalid token", 401);
    req.context.userId = (payload as any).userId;
    req.context.role = (payload as any).role;
    next();
  } catch (error) {
    next(error);
  }
};
