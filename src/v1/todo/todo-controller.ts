import { NextFunction, Request, Response } from "express";
import { todoServiceInstance } from "./todo-service.js";
import { validate } from "../../validation/validate.js";
import {
  CreateTodoSchema,
  todoIdSchema,
  UpdateTodoSchema,
} from "./schema/todo-schema.js";
import { ResponseBody } from "../../types/response/response.js";

export async function handleCreateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationBody = validate(CreateTodoSchema, req.body);
    await todoServiceInstance.createTodo(req.context, validationBody);
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export async function handleDeletodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationTodoId = validate(todoIdSchema, req.params.id);

    const deletedTodId = await todoServiceInstance.deleteTodo(
      req.context,
      validationTodoId
    );
    res.status(200).json({
      todoId: deletedTodId,
    });
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
    const todos = await todoServiceInstance.getTodos(req.context);
    const resBody: ResponseBody = {
      message: "Successful get todo data",
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
    const validationTodoId = validate(todoIdSchema, req.params.id);
    const todo = await todoServiceInstance.getTodoById(
      req.context,
      validationTodoId
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
    const validationData = validate(UpdateTodoSchema, req.body);
    const updatedTodo = await todoServiceInstance.updateTodoById(
      req.context,
      validationData
    );
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
