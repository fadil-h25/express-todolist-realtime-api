import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/CustomError.js";
import { logger } from "../logger/index.js";

export const AuthRequestiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug("AuthRequestMiddleware() is running");
    const accessToken = req.cookies["access_token"];

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) throw new CustomError("Secret key is null", 500);

    const payload = jwt.verify(accessToken, secretKey, {});
    if (!payload) throw new CustomError("Invalid token", 401);
    req.context.userId = (payload as any).userId;
    req.context.role = (payload as any).role;
  } catch (error) {
    next(error);
  }
};
