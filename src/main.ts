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

dotenv.config();

const app = express();
checkDatabaseConnection();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Aplly global middlewares
globalMiddleware.forEach((middleware) => app.use(middleware));

app.get("/test", (req: Request, res: Response) => {
  logger.info(
    "request received",
    generateLogMetaData(req.context.reqId, req.route.path, "main", "main")
  );
  res.send("Hello World!");
});

app.use("/auth", authRoute);

app.use(ErrorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
