import { Server, Socket } from "socket.io";
import { todoGateway } from "./todo-gateway.js";
import { TodoSocketEvent } from "./enum/todo-socket-event.js";

export function registerTodoGateway(socket: Socket) {
  socket.on(TodoSocketEvent.createTodo, (data, callback) =>
    todoGateway.create(socket, data, callback)
  );

  socket.on(TodoSocketEvent.updateTodo, (data, callback) =>
    todoGateway.update(socket, data, callback)
  );

  socket.on(TodoSocketEvent.deleteTodo, (id, callback) =>
    todoGateway.delete(socket, id, callback)
  );
}
