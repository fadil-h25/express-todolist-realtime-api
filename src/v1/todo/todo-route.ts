import express from "express";
import {
  handleCreateTodo,
  handleDeletodoById,
  handleGetTodoById,
  handleGetTodos,
  handleUpdateTodoById,
} from "./todo-controller.js";

export const todoRouter = express.Router();

todoRouter.get("", handleGetTodos);
todoRouter.post("", handleCreateTodo);
todoRouter.get("/:id", handleGetTodoById);

todoRouter.put("/:id", handleUpdateTodoById);
todoRouter.delete("/:id", handleDeletodoById);
