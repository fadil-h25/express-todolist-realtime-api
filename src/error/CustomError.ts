import { ZodError } from "zod";
import { ZodErrorMapper } from "../helper/zod-error-mapper";
import { FormatZodError } from "../types/format-zod-error";

export class CustomError extends Error {
  success: boolean;
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.success = false;
    this.message = message;
    this.statusCode = statusCode;
  }
}
