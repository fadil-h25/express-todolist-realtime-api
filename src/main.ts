import express from "express";
import { Request, Response } from "express";
import { globalMiddleware } from "./middleware/global/index.js";
import { logger } from "./logger/index.js";
import { generateLogMetaData } from "./helper/generate-log-meta-data.js";
import dotenv from "dotenv";
import { checkDatabaseConnection } from "./database/index.js";
import { ErrorHandlerMiddleware } from "./middleware/error-handler-middleware.js";
import cookieParser from "cookie-parser";
import { authRoute } from "./v1/auth/auth-route.js";
import { todoRouter } from "./v1/todo/todo-route.js";

dotenv.config();

const app = express();
checkDatabaseConnection();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Aplly global middlewares
globalMiddleware.forEach((middleware) => app.use(middleware));

app.use("/auth", authRoute);

app.use("/todos", todoRouter);

app.use(ErrorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
