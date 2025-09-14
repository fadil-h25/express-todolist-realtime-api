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

const app = express();
checkDatabaseConnection();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Aplly global middlewares
globalMiddleware.forEach((middleware) => app.use(middleware));

//public route
app.use("/auth", authRoute);

//private route
app.use(AuthRequestiddleware);
app.use("/todolists", todolistRouter);
app.use("/todolists/:todolistId/todos", todoRouter);
app.use("/todolist-member", todolistMemberRouter);

app.use(ErrorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
