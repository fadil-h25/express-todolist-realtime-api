import express, { type Request } from "express";
import { globalMiddleware } from "./middleware/global/index.js";
import { logger } from "./logger/index.js";
import { generateLogMetaData } from "./helper/generate-log-meta-data.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aplly global middlewares
globalMiddleware.forEach((middleware) => app.use(middleware));

app.get("/test", (req: Request, res) => {
  logger.info(
    "request received",
    generateLogMetaData(req.requestId as string, req.route.path, "main")
  );
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
