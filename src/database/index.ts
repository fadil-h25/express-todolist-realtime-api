import { PrismaClient } from "@prisma/client";

import { logger } from "../logger/index";

export const prisma = new PrismaClient();

export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection error", { error });
    process.exit(1);
  }
}
