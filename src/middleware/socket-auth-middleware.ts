import cookie from "cookie";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/CustomError.js";
import { logger } from "../logger/index.js";
import { SocketContext } from "../types/context.js";

export function socketAuthMiddlewre(
  socket: Socket,
  next: (err?: Error) => void
) {
  try {
    logger.debug("SocketAuthMiddleware() is running");

    const rawCookies = socket.handshake.headers.cookie;

    if (!rawCookies) throw new CustomError("Token invalid", 401);

    const cookies = cookie.parse(rawCookies);
    const accessToken = cookies["access_token"];

    if (!accessToken) throw new CustomError("Token invalid", 401);

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error("Secret key is null");

    const payload = jwt.verify(accessToken, secretKey, {});
    (socket.data.context as SocketContext).userId = (payload as any).userId;
    (socket.data.context as SocketContext).role = (payload as any).role;

    next();
  } catch (error) {
    next(new CustomError("Unauthorized", 401));
  }
}
