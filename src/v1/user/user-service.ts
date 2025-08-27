// src/v1/user/user-service.ts
import { PrismaClient, Prisma } from "@prisma/client";
import { Context } from "../../types/context";
import { UserResponseForLogin } from "./dto/user-response";
import { logger } from "../../logger";
import { generateLogMetaData } from "../../helper/generate-log-meta-data";
import { prisma } from "../../database";
import { CreateUserRequest } from "./dto/user-request";

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
}

// user-service.ts
export const userServiceInstance = new UserService(prisma);
