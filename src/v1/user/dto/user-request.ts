import z from "zod";
import { CreateUserSchema } from "../schema/user-schema.js";

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
