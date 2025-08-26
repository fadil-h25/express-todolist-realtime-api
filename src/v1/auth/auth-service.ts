// src/v1/auth/auth-service.ts
import { PrismaClient, Prisma } from "@prisma/client";
import { Context } from "../../types/context";
import { logger } from "../../logger";
import { generateLogMetaData } from "../../helper/generate-log-meta-data";
import { UserService, userServiceInstance } from "../user/user-service";
import e from "express";
import { prisma } from "../../database";

const serviceName = "auth-service";
const domainName = "auth";

export class AuthService {
  private prisma: PrismaClient;
  private userService: UserService;

  constructor(prisma: PrismaClient, userService: UserService) {
    this.prisma = prisma;
    this.userService = userService;
  }

  async login(
    ctx: Context,
    data: any,
    tx?: Prisma.TransactionClient
  ): Promise<any> {
    logger.debug(
      "getUserByEmailForLogin() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );

    const db = tx ?? this.prisma;
    return await this.userService.getUserByEmailForLogin(ctx, data.email);
  }
}

export const authServiceInstance = new AuthService(prisma, userServiceInstance);
