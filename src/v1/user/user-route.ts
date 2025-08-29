import express from "express";
import { updateUser } from "./user-controller";

export const userRouter = express.Router();

userRouter.put("/users/me", updateUser);
