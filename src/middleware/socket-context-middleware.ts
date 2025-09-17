import { SocketData, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/CustomError";
import { logger } from "../logger";
import { v4 } from "uuid";
import { SocketContext } from "../types/context";

export function socketContextMidlleware(
  socket: Socket,
  next: (err?: Error) => void
) {
  logger.debug("SocketContextMiddleware() is running");
  try {
    const ctx: SocketContext = {
      reqId: v4(),
      userIp: socket.handshake.address,
      route: socket.handshake.url,
    };

    (socket.data.context as SocketContext) = ctx;
    next();
  } catch (error) {}
}
