// src/v1/user/user-service.ts
import { PrismaClient, Prisma } from "@prisma/client";
import { Context } from "../../types/context.js";
import { UserResponseForLogin, UserUpdateMe } from "./dto/user-response.js";
import { logger } from "../../logger/index.js";
import { generateLogMetaData } from "../../helper/generate-log-meta-data.js";
import { prisma } from "../../database/index.js";
import { CreateUserRequest, UpdateUserRequest } from "./dto/user-request.js";

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

    return db.user.findUnique({
      where: { email },
    });
  }

  async createUserForRegsiter(
    ctx: Context,
    data: CreateUserRequest,
    tx?: Prisma.TransactionClient
  ) {
    const db = tx ?? this.prisma;
    logger.debug(
      "createUser() running",
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
  async deleteMe() {}
}

// user-service.ts
export const userServiceInstance = new UserService(prisma);
