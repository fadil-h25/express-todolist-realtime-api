import { Prisma, PrismaClient, TodolistMemberRole } from "@prisma/client";
import { prisma } from "../../database/index.js";
import { Context } from "../../types/context.js";
import { CreateTodoSchema, UpdateTodoSchema } from "./schema/todo-schema.js";
import {
  CreateTodoRequest,
  DeleteTodoByIdRequest,
  GetTodoByIdRequest,
  GetTodosRequest,
  UpdateTodoRequest,
} from "./dto/todo-request.js";
import { TodoResponse } from "./dto/todo-response.js";
import { CustomError } from "../../error/CustomError.js";
import {
  TodolistService,
  todolistServiceInstance,
} from "../todolist/todolist-service.js";
import { todo } from "node:test";
import { normalizeString } from "../../util/is-empty-string.js";
import {
  TodolistMemberService,
  todolistMemberServiceInstance,
} from "../todolist-member/todolist-member-service.js";
import { GetTodolistMemberByMemberId } from "../todolist-member/dto/todolist-member-request.js";
import { generateLogMetaData } from "../../helper/generate-log-meta-data.js";
import { logger } from "../../logger/index.js";

const domainName = "todo";
const serviceName = "todo-service";
export class TodoService {
  constructor(
    private prisma: PrismaClient,
    private todolistService: TodolistService,
    private todolistMemberServiceInstance: TodolistMemberService
  ) {}

  async createTodo(
    ctx: Context,
    data: CreateTodoRequest
  ): Promise<TodoResponse> {
    const cretedTodo = await this.prisma.$transaction(async (tx) => {
      logger.debug(
        "createTodo() running",
        generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
      );
      if (data.isOwner) {
        const todolist = await todolistServiceInstance.getTodolistById(
          ctx,
          data.todolistId,
          tx
        );
        if (todolist.isPublic == false)
          throw new CustomError(
            "Access denied, this data is not for public",
            403
          );
      } else {
        await todolistMemberServiceInstance.checkMemberAccess(
          ctx,
          data.todolistId,
          true,
          tx
        );
      }

      const createdTodo = await tx.todo.create({
        data: {
          title: data.title,
          status: data.todoStatus,
          description: data.description,
          todolistId: data.todolistId,
        },
      });

      return createdTodo;
    });
    return cretedTodo;
  }

  async getTodos(ctx: Context, data: GetTodosRequest): Promise<TodoResponse[]> {
    logger.debug(
      "getTodos() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );
    const todos = await this.prisma.$transaction(async (tx) => {
      if (data.isOwner == true) {
        const todolist = await todolistServiceInstance.getTodolistById(
          ctx,
          data.todolistId,
          tx
        );
        if (todolist.isPublic == false)
          throw new CustomError(
            "Access denied, this data is not for public",
            403
          );
      } else {
        await todolistMemberServiceInstance.checkMemberAccess(
          ctx,
          data.todolistId,
          false
        );
      }

      return await tx.todo.findMany({
        where: {
          todolistId: data.todolistId,
        },

        select: {
          id: true,
          title: true,
          status: true,
          todolistId: true,
          createdAt: true,
          updatedAt: true,
          description: true,
        },
      });
    });

    return todos;
  }

  async getTodoById(
    ctx: Context,
    data: GetTodoByIdRequest,
    tx?: Prisma.TransactionClient
  ): Promise<TodoResponse> {
    logger.debug(
      "getTodoById() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const todo = await this.prisma.$transaction(async (tx) => {
      if (data.isOwner) {
        const todolist = await todolistServiceInstance.getTodolistById(
          ctx,
          data.todolistId,
          tx
        );
        if (todolist.isPublic == false)
          throw new CustomError(
            "Access denied, this data is not for public",
            403
          );
      } else {
        await todolistMemberServiceInstance.checkMemberAccess(
          ctx,
          data.todolistId,
          true
        );
      }

      // pastikan todolist valid & milik user

      const todo = await tx.todo.findUnique({
        where: {
          id: data.id,
          todolistId: data.todolistId, // pastikan belong to todolist
        },
        select: {
          id: true,
          title: true,
          status: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          todolistId: true,
        },
      });

      return todo;
    });

    if (!todo) throw new CustomError("Todo not found", 404);

    return todo;
  }

  async updateTodoById(
    ctx: Context,
    data: UpdateTodoRequest
  ): Promise<TodoResponse> {
    logger.debug(
      "updateTodoById() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );
    return await this.prisma.$transaction(async (tx) => {
      if (data.isOwner) {
        const todolist = await todolistServiceInstance.getTodolistById(
          ctx,
          data.todolistId,
          tx
        );
        if (todolist.isPublic == false)
          throw new CustomError(
            "Access denied, this data is not for public",
            403
          );
      } else {
        await todolistMemberServiceInstance.checkMemberAccess(
          ctx,
          data.todolistId,
          true
        );
      }
      await this.todolistService.getTodolistById(ctx, data.todolistId, tx);

      const todo = await tx.todo.update({
        where: {
          id: data.id,
          todolistId: data.todolistId,
        },
        data: {
          title: normalizeString(data.title),
          description: normalizeString(data.description),
          status: data.status ?? undefined,
        },
      });

      return todo;
    });
  }

  async deleteTodo(ctx: Context, data: DeleteTodoByIdRequest) {
    logger.debug(
      "deleteTodo() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );
    await this.prisma.$transaction(async (tx) => {
      if (data.isOwner) {
        const todolist = await todolistServiceInstance.getTodolistById(
          ctx,
          data.todolistId,
          tx
        );
        if (todolist.isPublic == false)
          throw new CustomError(
            "Access denied, this data is not for public",
            403
          );
      } else {
        await todolistMemberServiceInstance.checkMemberAccess(
          ctx,
          data.todolistId,
          true
        );
      }

      await this.todolistService.getTodolistById(ctx, data.todolistId, tx);
      const result = await tx.todo.delete({
        where: {
          id: data.id,
          todolistId: data.todolistId,
        },
      });
    });

    return data.id;
  }
}

export const todoServiceInstance = new TodoService(
  prisma,
  todolistServiceInstance,
  todolistMemberServiceInstance
);
