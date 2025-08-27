import z from "zod";
import {
  userEmailSchema,
  userNameSchema,
  userPasswordSchema,
  userRoleSchema,
} from "../../user/schema/user-schema";

export const AuthLoginSchema = z.object({
  email: userEmailSchema,
  password: userPasswordSchema,
});

export const AuthRegisterSchema = z.object({
  email: userEmailSchema,
  password: userPasswordSchema,
  name: userNameSchema,
  role: userRoleSchema.optional().default("USER"),
});
