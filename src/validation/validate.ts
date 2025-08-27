import { z, ZodType } from "zod";

export function validate<T>(schema: ZodType<T>, data: unknown): T {
  try {
    const result = schema.parse(data);
    return result;
  } catch (error) {
    throw error;
  }
}
