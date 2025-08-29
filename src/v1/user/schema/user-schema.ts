// src/validation/user-fields.ts
import * as z from "zod";

export const userIdSchema = z.uuid();
export const userEmailSchema = z.email();
export const userPasswordSchema = z.string().min(8);
export const userNameSchema = z.string().min(1);
export const userRoleSchema = z.enum(["USER", "ADMIN"]);

export const CreateUserSchema = z.object({
  email: userEmailSchema,
  password: userPasswordSchema,
  name: userNameSchema,
  role: userRoleSchema.optional().default("USER"),
});

export const UpdateUserSchema = z.object({
  name: userNameSchema.optional(),
});
