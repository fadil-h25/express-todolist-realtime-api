import { RequestContextMiddleware } from "./reqeust-context-middleware.js";
import { RequestIdMiddleware } from "./request-id-middleware.js";

export const globalMiddleware = [RequestContextMiddleware];
