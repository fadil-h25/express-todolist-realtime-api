import type { NextFunction, Request, Response } from "express";
import { authServiceInstance } from "./auth-service.js";
import { validate } from "../../validation/validate.js";
import { AuthLoginSchema, AuthRegisterSchema } from "./schema/auth-schema.js";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const validationBody = validate(AuthLoginSchema, req.body);
    const token = await authServiceInstance.login(req.context, validationBody);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // set to true if using https
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationBody = validate(AuthRegisterSchema, req.body);

    authServiceInstance.register(req.context, validationBody);
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}
