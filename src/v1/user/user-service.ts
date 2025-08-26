// src/v1/user/user-service.ts
import { PrismaClient, Prisma } from "@prisma/client";
import { Context } from "../../types/context";
import { UserResponseForLogin } from "./dto/user-response";
import { logger } from "../../logger";
import { generateLogMetaData } from "../../helper/generate-log-meta-data";
import { prisma } from "../../database";

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
}

// user-service.ts
export const userServiceInstance = new UserService(prisma);
