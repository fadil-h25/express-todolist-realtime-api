import { Socket } from "socket.io";
import { todoServiceInstance } from "./todo-service.js";
import { TodoSocketEvent } from "./enum/todo-socket-event.js";
import { validate } from "../../validation/validate.js";
import {
  CreateTodoSchema,
  DeleteTodoByIdSchema,
  UpdateTodoSchema,
} from "./schema/todo-schema.js";
import { socketErrorHandler } from "../../helper/socket-error-handler.js";
import { DeleteTodoByIdRequest } from "./dto/todo-request.js";
import { logger } from "../../logger/index.js";

export const todoGateway = {
  create: async (socket: Socket, data: any, callback: Function) => {
    try {
      logger.debug("todoGateway.create() running", {
        socketId: socket.id,
        data,
      });
      const validationData = validate(CreateTodoSchema, data);
      const ctx = socket.data.context;

      const createdData = await todoServiceInstance.createTodo(
        ctx,
        validationData
      );

      logger.debug("todoGateway.create() success", createdData);
      callback({ success: true, data: createdData });

      logger.debug(
        `Emitting createdTodo to room: todolist-room:${createdData.todolistId}`
      );
      socket
        .to(`todolist-room:${createdData.todolistId}`)
        .emit(TodoSocketEvent.createdTodo, createdData);
    } catch (err) {
      logger.debug("todoGateway.create() error", err);
      callback(socketErrorHandler(err));
    }
  },

  update: async (socket: Socket, data: any, callback: Function) => {
    try {
      logger.debug("todoGateway.update() running", {
        socketId: socket.id,
        data,
      });
      const validationData = validate(UpdateTodoSchema, data);
      const ctx = socket.data.context;

      const updated = await todoServiceInstance.updateTodoById(
        ctx,
        validationData
      );

      logger.debug("todoGateway.update() success", updated);
      callback({ success: true, data: updated });

      logger.debug(
        `Emitting updatedTodo to room: todolist-room:${updated.todolistId}`
      );
      socket
        .to(`todolist-room:${updated.todolistId}`)
        .emit(TodoSocketEvent.updatedTodo, updated);
    } catch (err) {
      logger.debug("todoGateway.update() error", err);
      callback(socketErrorHandler(err));
    }
  },

  delete: async (
    socket: Socket,
    data: DeleteTodoByIdRequest,
    callback: Function
  ) => {
    try {
      logger.debug("todoGateway.delete() running", {
        socketId: socket.id,
        data,
      });
      const validationData = validate(DeleteTodoByIdSchema, data);
      const ctx = socket.data.context;

      const deletedId = await todoServiceInstance.deleteTodo(
        ctx,
        validationData
      );

      logger.debug("todoGateway.delete() success", { deletedId });
      callback({ success: true });

      logger.debug(`Emitting deletedTodo to room: todolist-room:${deletedId}`);
      socket
        .to(`todolist-room:${deletedId}`)
        .emit(TodoSocketEvent.deletedTodo, { id: deletedId });
    } catch (err) {
      logger.debug("todoGateway.delete() error", err);
      callback(socketErrorHandler(err));
    }
  },
};
