import express from "express";
import {
  handleCreateTodolist,
  handleDeleteTodolistById,
  handleGetTodolistById,
  handleGetTodolists,
  handleUpdateTodolistById,
} from "./todolist-controller";

export const todolistRouter = express.Router();

todolistRouter.get("", handleGetTodolists);
todolistRouter.post("", handleCreateTodolist);
todolistRouter.get("/:id", handleGetTodolistById);
todolistRouter.put("/:id", handleUpdateTodolistById);
todolistRouter.delete("/:id", handleDeleteTodolistById);
