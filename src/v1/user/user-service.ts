// src/v1/user/user-service.ts
import { PrismaClient, Prisma } from "@prisma/client";
import { Context } from "../../types/context.js";
import {
  GetUserByEmailResponse,
  UserResponse,
  UserResponseForLogin,
  UserUpdateMe,
} from "./dto/user-response.js";
import { logger } from "../../logger/index.js";
import { generateLogMetaData } from "../../helper/generate-log-meta-data.js";
import { prisma } from "../../database/index.js";
import { CreateUserRequest, UpdateUserRequest } from "./dto/user-request.js";
import { CustomError } from "../../error/CustomError.js";

const serviceName = "user-service";
const domainName = "user";

export class UserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getUserByEmailForLogin(
    ctx: Context,
    email: string,
    tx?: Prisma.TransactionClient
  ): Promise<UserResponseForLogin | null> {
    const db = tx ?? this.prisma;
    logger.debug(
      "getUserByEmailForLogin() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    return await db.user.findUnique({
      where: { email },
    });
  }

  async getUserByEmail(
    ctx: Context,
    email: string,
    tx?: Prisma.TransactionClient
  ): Promise<GetUserByEmailResponse> {
    const db = tx ?? this.prisma;
    logger.debug(
      "getUserByEmailForLogin() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) throw new CustomError("User not found", 404);

    return user;
  }

  async createUserForRegsiter(
    ctx: Context,
    data: CreateUserRequest,
    tx?: Prisma.TransactionClient
  ) {
    const db = tx ?? this.prisma;
    logger.debug(
      "createUserForRegsiter() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    await db.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role ?? "USER",
      },
    });
  }

  async updateUser(
    ctx: Context,
    data: UpdateUserRequest,
    tx?: Prisma.TransactionClient
  ): Promise<UserUpdateMe> {
    const db = tx ?? this.prisma;
    logger.debug(
      "updateUser() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const updatedUser = await db.user.update({
      where: {
        id: ctx.userId as string,
      },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return updatedUser;
  }

  async deleteMe(ctx: Context, tx?: Prisma.TransactionClient) {
    const db = tx ?? this.prisma;
    logger.debug(
      "deleteMe() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );
    // implementasi delete user nanti di sini
  }
}

// user-service.ts
export const userServiceInstance = new UserService(prisma);
