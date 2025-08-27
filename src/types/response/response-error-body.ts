import { FormatZodError } from "../format-zod-error";

export interface ResponseErrorBody {
  success: boolean;
  message: string;
  errors?: FormatZodError[];
}
