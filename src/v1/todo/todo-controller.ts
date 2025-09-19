import { NextFunction, Request, Response } from "express";
import { todoServiceInstance } from "./todo-service.js";
import { validate } from "../../validation/validate.js";
import {
  CreateTodoSchema,
  UpdateTodoSchema,
  GetTodoByIdSchema,
  DeleteTodoByIdSchema,
  GetTodosSchema,
} from "./schema/todo-schema.js";
import { todolistIdSchema } from "../todolist/schema/todolist-schema.js";
import { ResponseBody } from "../../types/response/response.js";
import { logger } from "../../logger/index.js";
import { io } from "../../main.js";
import { TodoSocketEvent } from "./enum/todo-socket-event.js";
import { TodolistSocketEvent } from "../todolist/enum/todolist-socket-event.js";

export async function handleCreateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationBody = validate(CreateTodoSchema, {
      ...req.body,
      todolistId: req.params.todolistId,
    });

    const createdTodo = await todoServiceInstance.createTodo(
      req.context,
      validationBody
    );

    io.to(TodolistSocketEvent.todolistRoomPrefix + createdTodo.todolistId).emit(
      TodoSocketEvent.createdTodo,
      createdTodo
    );

    const responseBody: ResponseBody = {
      message: "Successful create todo",
      data: createdTodo,
      success: true,
    };
    return res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationParams = validate(DeleteTodoByIdSchema, {
      todolistId: req.params.todolistId,
      id: req.params.id,
      ...req.body,
    });

    const deletedTodoId = await todoServiceInstance.deleteTodo(
      req.context,
      validationParams
    );

    io.to(
      TodolistSocketEvent.todolistRoomPrefix + validationParams.todolistId
    ).emit(TodoSocketEvent.deletedTodo, { id: deletedTodoId });

    return res.status(200).json({ todoId: deletedTodoId });
  } catch (error) {
    next(error);
  }
}

export async function handleGetTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationData = validate(GetTodosSchema, {
      ...req.body,
      todolistId: req.params.todolistId,
    });

    const todos = await todoServiceInstance.getTodos(
      req.context,
      validationData
    );

    const resBody: ResponseBody = {
      message: "Successful get todos data",
      success: true,
      data: todos,
    };
    return res.status(200).json(resBody);
  } catch (error) {
    next(error);
  }
}

export async function handleGetTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationData = validate(GetTodoByIdSchema, {
      todolistId: req.params.todolistId,
      id: req.params.id,
      ...req.body,
    });

    const todo = await todoServiceInstance.getTodoById(
      req.context,
      validationData
    );

    const resBody: ResponseBody = {
      message: "Successful get todo data",
      success: true,
      data: todo,
    };
    return res.status(200).json(resBody);
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationData = validate(UpdateTodoSchema, {
      ...req.body,
      todolistId: req.params.todolistId,
      id: req.params.id,
    });

    const updatedTodo = await todoServiceInstance.updateTodoById(
      req.context,
      validationData
    );

    io.to(
      TodolistSocketEvent.todolistRoomPrefix + validationData.todolistId
    ).emit(TodoSocketEvent.updatedTodo, updatedTodo);

    const resBody: ResponseBody = {
      message: "Successful update todo data",
      success: true,
      data: updatedTodo,
    };
    return res.status(200).json(resBody);
  } catch (error) {
    next(error);
  }
}
