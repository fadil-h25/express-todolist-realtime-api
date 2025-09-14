import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../database/index.js";
import { Context } from "../../types/context.js";
import { CreateTodoSchema, UpdateTodoSchema } from "./schema/todo-schema.js";
import { CreateTodoRequest, UpdateTodoRequest } from "./dto/todo-request.js";
import { TodoResponse } from "./dto/todo-response.js";
import { CustomError } from "../../error/CustomError.js";
import {
  TodolistService,
  todolistServiceInstance,
} from "../todolist/todolist-service.js";

export class TodoService {
  constructor(
    private prisma: PrismaClient,
    private todolistService: TodolistService
  ) {}

  async createTodo(ctx: Context, data: CreateTodoRequest) {
    await this.prisma.$transaction(async (tx) => {
      await todolistServiceInstance.getTodolistById(ctx, data.todolistId, tx);
      await tx.todo.create({
        data: {
          title: data.title,
          status: data.todoStatus,
          description: data.description,
          todolistId: data.todolistId,
        },
      });
    });
  }

  async getTodos(
    ctx: Context,
    todolistId: string,
    tx?: Prisma.TransactionClient
  ): Promise<TodoResponse[]> {
    const db = tx ?? prisma;
    const todos = await db.todo.findMany({
      where: {
        todolistId,
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

    return todos;
  }

  async getTodoById(
    ctx: Context,
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<TodoResponse> {
    const db = tx ?? prisma;
    const todo = await db.todo.findFirst({
      where: {
        id,
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
    const updatedTodo = await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title ?? undefined,
        description: data.description ?? undefined,
        status: data.todoStatus ?? undefined,
      },
    });

    return updatedTodo;
  }

  async deleteTodo(ctx: Context, id: string, tx?: Prisma.TransactionClient) {
    const db = tx ?? this.prisma;
    const todoId = await db.todo.deleteMany({
      where: {
        id,
      },
    });

    return todoId;
  }
}

export const todoServiceInstance = new TodoService(
  prisma,
  todolistServiceInstance
);
