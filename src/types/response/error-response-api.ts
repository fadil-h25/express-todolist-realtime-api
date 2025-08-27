import { ZodError } from "zod";
import { ZodErrorMapper } from "../../helper/zod-error-mapper";
import { FormatZodError } from "../format-zod-error";

export class ErroResponse extends Error {
  success: boolean;
  message: string;
  statusCode?: number;
  errors?: FormatZodError[];

  constructor(message: string, errorSource?: unknown, statusCode?: number) {
    super(message);
    this.success = false;
    this.message = message;
    this.statusCode = statusCode;

    if (errorSource instanceof ZodError) {
      this.statusCode = 400;
      this.message = "Validation Error";
      this.errors = ZodErrorMapper(errorSource);
    } else {
      this.errors = undefined;
    }
  }
}
