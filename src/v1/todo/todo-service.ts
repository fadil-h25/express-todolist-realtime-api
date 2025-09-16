import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../database/index.js";
import { Context } from "../../types/context.js";
import { CreateTodoSchema, UpdateTodoSchema } from "./schema/todo-schema.js";
import {
  CreateTodoRequest,
  DeleteTodoByIdRequest,
  GetTodoByIdRequest,
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

export class TodoService {
  constructor(
    private prisma: PrismaClient,
    private todolistService: TodolistService
  ) {}

  async createTodo(
    ctx: Context,
    data: CreateTodoRequest
  ): Promise<TodoResponse> {
    const cretedTodo = await this.prisma.$transaction(async (tx) => {
      await todolistServiceInstance.getTodolistById(ctx, data.todolistId, tx);
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

  async getTodos(ctx: Context, todolistId: string): Promise<TodoResponse[]> {
    const todos = await this.prisma.$transaction(async (tx) => {
      const todolist = await todolistServiceInstance.getTodolistById(
        ctx,
        todolistId,
        tx
      );

      return await tx.todo.findMany({
        where: {
          todolistId: todolist.id,
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
    const db = tx ?? this.prisma;

    // pastikan todolist valid & milik user
    await this.todolistService.getTodolistById(ctx, data.todolistId, db);

    const todo = await db.todo.findUnique({
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

    if (!todo) throw new CustomError("Todo not found", 404);

    return todo;
  }

  async updateTodoById(
    ctx: Context,
    data: UpdateTodoRequest
  ): Promise<TodoResponse> {
    return this.prisma.$transaction(async (tx) => {
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

  async deleteTodo(
    ctx: Context,
    data: DeleteTodoByIdRequest,
    tx?: Prisma.TransactionClient
  ) {
    const db = tx ?? this.prisma;

    await this.todolistService.getTodolistById(ctx, data.todolistId, db);

    const result = await db.todo.deleteMany({
      where: {
        id: data.id,
        todolistId: data.todolistId,
      },
    });

    if (result.count === 0) throw new CustomError("Todo not found", 404);

    return data.id;
  }
}

export const todoServiceInstance = new TodoService(
  prisma,
  todolistServiceInstance
);
