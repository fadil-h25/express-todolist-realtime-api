import z from "zod";
import {
  userEmailSchema,
  userPasswordSchema,
} from "../../user/schema/user-schema";

export const authLoginSchema = z.object({
  email: userEmailSchema,
  password: userPasswordSchema,
});
