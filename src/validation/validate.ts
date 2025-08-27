import { z, ZodType } from "zod";
import { CustomError } from "../error/CustomError";

export function validate<T>(schema: ZodType<T>, data: unknown): T {
  try {
    const result = schema.parse(data);
    return result;
  } catch (error) {
    throw error;
  }
}
