import { Socket } from "socket.io";

import { todolistServiceInstance } from "./todolist-service.js";
import { TodolistSocketEvent } from "./enum/todolist-socket-event.js";
import { validate } from "../../validation/validate.js";
import {
  CreateTodolistSchema,
  UpdateTodolistSchema,
} from "./schema/todolist-schema.js";
import { todoIdSchema } from "../todo/schema/todo-schema.js";
import { socketErrorHandler } from "../../helper/socket-error-handler.js";
import { userIdSchema } from "../user/schema/user-schema";
import { logger } from "../../logger/index.js";

export const todolistGateway = {
  joinTodolistRoomWhenLogin: async (socket: Socket) => {
    logger.debug("joinTodolistRoomWhenLogin() running");
    logger.debug(`isi dari context: ${JSON.stringify(socket.data.context)}`);
    const todolists = await todolistServiceInstance.getTodolists(
      socket.data.context
    );

    logger.debug({ todolists });

    todolists.forEach((data) => {
      logger.debug(
        `Joining room: ${TodolistSocketEvent.todolistRoomPrefix}${data.id}`
      );
      socket.join(`${TodolistSocketEvent.todolistRoomPrefix}${data.id}`);
    });
    logger.debug(`User joined ${todolists.length} todolist rooms`);
  },

  create: async (socket: Socket, data: any, callback: Function) => {
    try {
      logger.debug("create() running", data);
      const validationData = validate(CreateTodolistSchema, data);
      const ctx = socket.data.context;

      const result = await todolistServiceInstance.createTodolist(
        ctx,
        validationData
      );

      logger.debug("create() success", result);
      callback({ success: true, data: result });

      // emit ke room todolist baru
      logger.debug(
        `Emitting createdTodolist to room: todolist-room:${result.id}`
      );
      socket
        .to(`todolist-room:${result.id}`)
        .emit(TodolistSocketEvent.createdTodolist, result);
    } catch (err) {
      logger.debug("create() error", err);
      callback(socketErrorHandler(err));
    }
  },

  update: async (socket: Socket, data: any, callback: Function) => {
    try {
      logger.debug("update() running", data);
      const validationData = validate(UpdateTodolistSchema, data);
      const ctx = socket.data.context;

      const updatedData = await todolistServiceInstance.updateTodolistById(
        ctx,
        validationData
      );

      logger.debug("update() success", updatedData);
      callback({ success: true, data: updatedData });

      logger.debug(
        `Emitting updatedTodolist to room: todolist-room:${updatedData.id}`
      );
      socket
        .to(`todolist-room:${updatedData.id}`)
        .emit(TodolistSocketEvent.updatedTodolist, updatedData);
    } catch (err) {
      logger.debug("update() error", err);
      callback(socketErrorHandler(err));
    }
  },

  delete: async (socket: Socket, id: string, callback: Function) => {
    try {
      logger.debug("delete() running", { id });
      const validationId = validate(todoIdSchema, id);
      const ctx = socket.data.context;

      await todolistServiceInstance.deleteTodolistById(ctx, validationId);

      logger.debug("delete() success", { id: validationId });
      callback({ success: true });

      logger.debug(
        `Emitting deletedTodolist to room: todolist-room:${validationId}`
      );
      socket
        .to(`todolist-room:${validationId}`)
        .emit(TodolistSocketEvent.deletedTodolist, { id: validationId });
    } catch (err) {
      logger.debug("delete() error", err);
      callback(socketErrorHandler(err));
    }
  },
};
