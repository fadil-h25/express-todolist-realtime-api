import expres, { NextFunction, Request, Response } from "express";
import { todolistMemberServiceInstance } from "./todolist-member-service.js";
import { validate } from "../../validation/validate.js";
import { CreateTodolistMemberSchema } from "./schema/todolist-member-schema.js";
import { ResponseBody } from "../../types/response/response.js";

export async function handleCreateTodolistMember(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationData = validate(CreateTodolistMemberSchema, {
      ...req.body,
      todolistId: req.params.todolistId,
    });

    const createdTodolistMember =
      await todolistMemberServiceInstance.createTodolistMember(
        req.context,
        validationData
      );

    const responseBody: ResponseBody = {
      message: "Successful create data",
      success: true,
      data: createdTodolistMember,
    };

    return res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
}
