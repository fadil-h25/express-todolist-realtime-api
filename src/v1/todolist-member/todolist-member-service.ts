import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../database/index.js";
import { UserService, userServiceInstance } from "../user/user-service.js";
import {
  TodolistService,
  todolistServiceInstance,
} from "../todolist/todolist-service.js";
import { Context } from "../../types/context.js";
import {
  CreateTodolistMemberRequest,
  DeleteTodolistMemberRequest,
  GetTodolistMemberByIdRequest,
  UpdateTodolistMemberRequest,
} from "./dto/todolist-member-request.js";
import { TodolistMemberResponse } from "./dto/todolist-member-response.js";
import { logger } from "../../logger/index.js";
import { generateLogMetaData } from "../../helper/generate-log-meta-data.js";
import { CustomError } from "../../error/CustomError.js";

const domainName = "todolist-member";
const serviceName = "todolist-member-service";

export class TodolistMemberService {
  constructor(
    private prisma: PrismaClient,
    private userService: UserService,
    private todolistService: TodolistService
  ) {}

  async createTodolistMember(
    ctx: Context,
    data: CreateTodolistMemberRequest
  ): Promise<TodolistMemberResponse> {
    logger.debug(
      "createTodolistMember running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const createdTodolistMember = await this.prisma.$transaction(async (tx) => {
      const member = await this.userService.getUserByEmail(
        ctx,
        data.memberEmail,
        tx
      );

      if (ctx.userId === member.id) {
        throw new CustomError("Owner cannot be added as a member", 409);
      }

      const todolist = await this.todolistService.getTodolistById(
        ctx,
        data.todolistId,
        tx
      );

      const createdTodolistMember = await tx.todolistMember.create({
        data: {
          role: data.role,
          memberId: member.id,
          todolistId: todolist.id,
        },
        select: {
          id: true,
          role: true,
          todolistId: true,
          memberId: true,
        },
      });

      return createdTodolistMember;
    });

    return createdTodolistMember;
  }

  async updateTodolistMember(
    ctx: Context,
    data: UpdateTodolistMemberRequest
  ): Promise<TodolistMemberResponse> {
    logger.debug(
      "updateTodolistMember running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const updatedData = await this.prisma.$transaction(async (tx) => {
      const todolist = await this.todolistService.getTodolistById(
        ctx,
        data.todolistId,
        tx
      );

      const updatedData = await tx.todolistMember.update({
        where: {
          id: data.id,
          todolistId: todolist.id,
        },
        data: {
          role: data.role ?? undefined,
        },
        select: {
          id: true,
          role: true,
          todolistId: true,
          memberId: true,
        },
      });
      return updatedData;
    });

    return updatedData;
  }

  async getTodolistMemberById(
    ctx: Context,
    data: GetTodolistMemberByIdRequest
  ): Promise<TodolistMemberResponse> {
    logger.debug(
      "getTodolistMemberById running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const member = await this.prisma.$transaction(async (tx) => {
      const todolist = await this.todolistService.getTodolistById(
        ctx,
        data.todolistId,
        tx
      );

      const found = await tx.todolistMember.findUnique({
        where: {
          id: data.id,
          todolistId: todolist.id,
        },
        select: {
          id: true,
          role: true,
          todolistId: true,
          memberId: true,
        },
      });

      if (!found) {
        throw new CustomError("Todolist member not found", 404);
      }

      return found;
    });

    return member;
  }

  async getTodolistMembers(
    ctx: Context,
    todolistId: string
  ): Promise<TodolistMemberResponse[]> {
    logger.debug(
      "getTodolistMembers running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const members = await this.prisma.$transaction(async (tx) => {
      const todolist = await this.todolistService.getTodolistById(
        ctx,
        todolistId,
        tx
      );

      return await tx.todolistMember.findMany({
        where: { todolistId: todolist.id },
        select: {
          id: true,
          role: true,
          todolistId: true,
          memberId: true,
        },
      });
    });

    return members;
  }
}

export const todolistMemberServiceInstance = new TodolistMemberService(
  prisma,
  userServiceInstance,
  todolistServiceInstance
);
