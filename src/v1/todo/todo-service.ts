import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../database/index.js";
import { Context } from "../../types/context.js";
import { CreateTodoSchema, UpdateTodoSchema } from "./schema/todo-schema.js";
import { CreateTodoRequest, UpdateTodoRequest } from "./dto/todo-request.js";
import { TodoResponse } from "./dto/todo-response.js";
import { CustomError } from "../../error/CustomError.js";

export class TodoService {
  constructor(private prisma: PrismaClient) {}

  async createTodo(
    ctx: Context,
    data: CreateTodoRequest,
    tx?: Prisma.TransactionClient
  ) {
    const db = tx ?? this.prisma;
    await db.todo.create({
      data: {
        title: data.title,
        isPublic: data.isPublic,
        status: data.todoStatus,
        ownerId: ctx.userId as string,
      },
    });
  }

  async getTodos(
    ctx: Context,
    tx?: Prisma.TransactionClient
  ): Promise<TodoResponse[]> {
    const db = tx ?? prisma;
    const todos = await db.todo.findMany({
      where: {
        ownerId: ctx.userId,
      },

      select: {
        id: true,
        title: true,
        isPublic: true,
        status: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
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
        ownerId: ctx.userId,
      },
      select: {
        id: true,
        title: true,
        isPublic: true,
        status: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
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
        ownerId: ctx.userId,
      },
      data: {
        title: data.title ?? undefined,
        isPublic: data.isPublic ?? undefined,
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
        ownerId: ctx.userId,
      },
    });

    return todoId;
  }
}

export const todoServiceInstance = new TodoService(prisma);
