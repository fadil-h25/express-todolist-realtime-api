import { Request } from "express";
import { Context } from "./context.js";

declare module "express-serve-static-core" {
  interface Request {
    context: Context;
  }
}
