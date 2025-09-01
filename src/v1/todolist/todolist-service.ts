// src/v1/todolist/todolist-service.ts
import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../database/index.js";
import { Context } from "../../types/context.js";
import {
  CreateTodolistRequest,
  UpdateTodolistRequest,
} from "./dto/todolist-request.js";
import { TodolistResponse } from "./dto/todolist-response.js";
import { logger } from "../../logger/index.js";
import { generateLogMetaData } from "../../helper/generate-log-meta-data.js";

const serviceName = "todolist-service";
const domainName = "todolist";

export class Todolist {
  constructor(private prisma: PrismaClient) {}

  async getTodolists(ctx: Context): Promise<TodolistResponse[]> {
    logger.debug(
      "getTodolists() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const todolists = await this.prisma.todolist.findMany({
      where: {
        ownerId: ctx.userId as string,
      },
      select: {
        id: true,
        title: true,
        description: true,
        isPublic: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return todolists;
  }

  async getTodolistById(
    ctx: Context,
    todolistId: string
  ): Promise<TodolistResponse[]> {
    logger.debug(
      "getTodolistById() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const todolist = await this.prisma.todolist.findMany({
      where: {
        ownerId: ctx.userId as string,
        id: todolistId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        isPublic: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return todolist;
  }

  async deleteTodolistById(ctx: Context, todolistId: string): Promise<void> {
    logger.debug(
      "deleteTodolistById() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    await this.prisma.todolist.delete({
      where: {
        ownerId: ctx.userId as string,
        id: todolistId,
      },
    });
  }

  async createTodolist(
    ctx: Context,
    data: CreateTodolistRequest
  ): Promise<TodolistResponse> {
    logger.debug(
      "createTodolist() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const createdTodolist = await this.prisma.todolist.create({
      data: {
        title: data.title,
        description: data.description,
        isPublic: data.isPublic,
        ownerId: ctx.userId as string,
      },
      select: {
        id: true,
        title: true,
        description: true,
        isPublic: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return createdTodolist;
  }

  async updateTodolistById(
    ctx: Context,
    data: UpdateTodolistRequest
  ): Promise<TodolistResponse> {
    logger.debug(
      "updateTodolistById() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const updatedTodolist = await this.prisma.todolist.update({
      where: {
        id: data.id,
        ownerId: ctx.userId as string,
      },
      data: {
        description: data.description ?? undefined,
        title: data.title ?? undefined,
        isPublic: data.isPublic ?? undefined,
      },
      select: {
        id: true,
        title: true,
        description: true,
        isPublic: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedTodolist;
  }
}

export const todolistInstance = new Todolist(prisma);
