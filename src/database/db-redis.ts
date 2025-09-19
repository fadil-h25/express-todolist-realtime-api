import { createClient } from "redis";
import { logger } from "../logger/index.js";
import "../config/load-env.js";
export const redisClient = createClient({
  username: "default",
  password: "QAUunIdhnaLHBrshrApXsYctb5imd3LT",
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("error", (err) => logger.error("Redis redisClient Error", err));

await redisClient.connect();
