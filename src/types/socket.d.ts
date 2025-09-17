// src/types/socket.d.ts
import type { SocketContext } from "./context.js";

declare module "socket.io" {
  interface SocketData {
    context: SocketContext;
  }
}
