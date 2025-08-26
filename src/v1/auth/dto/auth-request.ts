import z from "zod";
import { authLoginSchema } from "../schema/auth-schema";

export type AuthLoginRequest = z.infer<typeof authLoginSchema>;
