import "./config/load-env.js";

import express from "express";
import { Request, Response } from "express";
import { globalMiddleware } from "./middleware/global/index.js";
import { logger } from "./logger/index.js";
import { generateLogMetaData } from "./helper/generate-log-meta-data.js";

import { checkDatabaseConnection } from "./database/index.js";
import { ErrorHandlerMiddleware } from "./middleware/error-handler-middleware.js";
import cookieParser from "cookie-parser";
import { authRoute } from "./v1/auth/auth-route.js";
import { todoRouter } from "./v1/todo/todo-route.js";
import { CustomError } from "./error/CustomError.js";
import { AuthRequestiddleware } from "./middleware/auth-request-middleware.js";
import { todolistRouter } from "./v1/todolist/todolist-router.js";
import { todolistMemberRouter } from "./v1/todolist-member/todolist-member-router.js";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
checkDatabaseConnection();
const port = 3000;

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Apply global middlewares
globalMiddleware.forEach((middleware) => app.use(middleware));

// Public route
app.use("/auth", authRoute);

// Private route
app.use(AuthRequestiddleware);
app.use("/todolists", todolistRouter);
app.use("/todolists/:todolistId/todos", todoRouter);
app.use("/todolists/:todolistId/todolist-members", todolistMemberRouter);

// Error handler
app.use(ErrorHandlerMiddleware);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    logger.debug("User disconnected: ", socket.id);
  });
});

httpServer.listen(port, () => {
  logger.debug(`Example app listening on port ${port}`);
});
