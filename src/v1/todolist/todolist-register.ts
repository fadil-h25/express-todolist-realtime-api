import { Socket } from "socket.io";

import { todolistGateway } from "./todolist-gateway.js";
import { TodolistSocketEvent } from "./enum/todolist-socket-event.js";

export function registerTodolistGateway(socket: Socket) {
  todolistGateway.joinTodolistRoomWhenLogin(socket);

  socket.on(TodolistSocketEvent.createTodolist, (data, cb) =>
    todolistGateway.create(socket, data, cb)
  );

  socket.on(TodolistSocketEvent.updateTodolist, (data, cb) =>
    todolistGateway.update(socket, data, cb)
  );

  socket.on(TodolistSocketEvent.deleteTodolist, (id, cb) =>
    todolistGateway.delete(socket, id, cb)
  );
}
