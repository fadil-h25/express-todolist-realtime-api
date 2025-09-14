// src/v1/auth/auth-service.ts
import { PrismaClient, Prisma } from "@prisma/client";
import { Context } from "../../types/context.js";
import { logger } from "../../logger/index.js";
import { generateLogMetaData } from "../../helper/generate-log-meta-data.js";
import { UserService, userServiceInstance } from "../user/user-service.js";
import e from "express";
import { prisma } from "../../database/index.js";
import { AuthLoginRequest, AuthRegisterRequest } from "./dto/auth-request.js";
import jwt from "jsonwebtoken";
import { CustomError } from "../../error/CustomError.js";
import bcrypt from "bcrypt";

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
    data: AuthLoginRequest,
    tx?: Prisma.TransactionClient
  ): Promise<String> {
    logger.debug(
      "getUserByEmailForLogin() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );
    const db = tx ?? this.prisma;

    const user = await this.userService.getUserByEmailForLogin(ctx, data.email);

    if (!user) throw new CustomError("Invalid email or password", 401);

    const compareResult = await bcrypt.compare(data.password, user.password);
    if (!compareResult) throw new CustomError("Invalid email or password", 401);

    return jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "1h" }
    );
  }

  async register(
    ctx: Context,
    data: AuthRegisterRequest,
    tx?: Prisma.TransactionClient
  ) {
    logger.debug(
      "register() running",
      generateLogMetaData(ctx.reqId, ctx.route, domainName, serviceName)
    );
    const db = tx ?? this.prisma;

    const user = await this.userService.getUserByEmailForLogin(ctx, data.email);

    if (user) throw new CustomError("Email already in use", 400);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.userService.createUserForRegsiter(ctx, {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: data.role,
    });
  }
}

export const authServiceInstance = new AuthService(prisma, userServiceInstance);
