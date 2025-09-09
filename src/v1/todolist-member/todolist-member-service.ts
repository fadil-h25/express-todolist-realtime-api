import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../database/index.js";
import { UserService, userServiceInstance } from "../user/user-service.js";
import {
  TodolistService,
  todolistServiceInstance,
} from "../todolist/todolist-service.js";
import { Context } from "../../types/context.js";
import { CreateTodolistMemberRequest } from "./dto/todolist-member-request.js";
import { TodolistMemberResponse } from "./dto/todolist-member-response.js";

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
    const createdTodolistMember = await this.prisma.$transaction(async (tx) => {
      const todolist = await this.todolistService.getTodolistById(
        ctx,
        data.todolistId,
        tx
      );

      const createdTodolistMember = await tx.todolistMember.create({
        data: {
          role: data.role,
          userId: ctx.userId as string,
          todolistId: todolist.id,
        },
        select: {
          id: true,
          role: true,
          todolistId: true,
          userId: true,
        },
      });

      return createdTodolistMember;
    });

    return createdTodolistMember;
  }
}

export const todolistMemberServiceInstance = new TodolistMemberService(
  prisma,
  userServiceInstance,
  todolistServiceInstance
);
