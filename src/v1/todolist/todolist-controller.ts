import { NextFunction, Request, Response } from "express";
import { todolistInstance } from "./todolist-service.js";
import { ResponseBody } from "../../types/response/response.js";
import {
  CreateTodolistSchema,
  todolistIdSchema,
  UpdateTodolistSchema,
} from "./schema/todolist-schema.js";
import { validate } from "../../validation/validate.js";
import { logger } from "../../logger/index.js";
import { generateLogMetaData } from "../../helper/generate-log-meta-data.js";

const serviceName = "todolist-controller";
const domainName = "todolist";

export async function handleGetTodolists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.debug(
      "handleGetTodolist() running",
      generateLogMetaData(
        req.context.reqId,
        req.context.route,
        domainName,
        serviceName
      )
    );

    const todolists = await todolistInstance.getTodolists(req.context);
    const responseBody: ResponseBody = {
      success: true,
      message: "Success get data",
      data: todolists,
    };
    return res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export async function handleGetTodolistById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.debug(
      "handleGetTodolistById() running",
      generateLogMetaData(
        req.context.reqId,
        req.context.route,
        domainName,
        serviceName
      )
    );

    const { id } = req.params;
    const todolist = await todolistInstance.getTodolistById(req.context, id);

    const responseBody: ResponseBody = {
      success: true,
      message: "Success get todolist",
      data: todolist,
    };
    return res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export async function handleCreateTodolist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.debug(
      "handleCreateTodolist() running",
      generateLogMetaData(
        req.context.reqId,
        req.context.route,
        domainName,
        serviceName
      )
    );

    const validationBody = validate(CreateTodolistSchema, req.body);

    const createdTodolist = await todolistInstance.createTodolist(
      req.context,
      validationBody
    );

    const responseBody: ResponseBody = {
      success: true,
      message: "Todolist created successfully",
      data: createdTodolist,
    };
    return res.status(201).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateTodolistById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.debug(
      "handleUpdateTodolistById() running",
      generateLogMetaData(
        req.context.reqId,
        req.context.route,
        domainName,
        serviceName
      )
    );

    const validationBody = validate(UpdateTodolistSchema, req.body);

    const updatedTodolist = await todolistInstance.updateTodolistById(
      req.context,
      validationBody
    );

    const responseBody: ResponseBody = {
      success: true,
      message: "Todolist updated successfully",
      data: updatedTodolist,
    };
    return res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteTodolistById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.debug(
      "handleDeleteTodolistById() running",
      generateLogMetaData(
        req.context.reqId,
        req.context.route,
        domainName,
        serviceName
      )
    );

    const { id } = req.params;
    const validationId = validate(todolistIdSchema, id);

    await todolistInstance.deleteTodolistById(req.context, validationId);

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
