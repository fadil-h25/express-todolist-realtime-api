import z from "zod";
import { CreateUserSchema } from "../schema/user-schema";

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
