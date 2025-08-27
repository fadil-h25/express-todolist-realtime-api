import z from "zod";
import { AuthLoginSchema, AuthRegisterSchema } from "../schema/auth-schema";

export type AuthLoginRequest = z.infer<typeof AuthLoginSchema>;
export type AuthRegisterRequest = z.infer<typeof AuthRegisterSchema>;
