import { Server, Socket } from "socket.io";
import { UserSocketEvent } from "./enum/user-socket-event.js";
import { SocketContext } from "../../types/context.js";
import { logger } from "../../logger/index.js";

export function registerUserGateway(socket: Socket) {
  logger.debug("registerUserGateway() running");
  socket.join(
    UserSocketEvent.userRoomPrefix +
      (socket.data.context as SocketContext).userId
  );
}
