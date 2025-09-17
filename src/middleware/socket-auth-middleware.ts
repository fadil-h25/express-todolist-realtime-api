import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/CustomError";
import { logger } from "../logger";
import { SocketContext } from "../types/context";

export function socketAuthMiddlewre(
  socket: Socket,
  next: (err?: Error) => void
) {
  try {
    logger.debug("SocketAutMiddleware() is running");
    const accessToken = socket.handshake.auth.accessToken;
    if (!accessToken) throw new CustomError("Invalid token", 401);

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error("Secret key is null");

    const payload = jwt.verify(accessToken, secretKey, {});
    (socket.data.context as SocketContext).userId = (payload as any).userId;
    (socket.data.context as SocketContext).role = (payload as any).role;
    next();
  } catch (error) {}
}
