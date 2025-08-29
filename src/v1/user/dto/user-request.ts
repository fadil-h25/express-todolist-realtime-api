import z from "zod";
import { CreateUserSchema, UpdateUserSchema } from "../schema/user-schema.js";

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;

export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
