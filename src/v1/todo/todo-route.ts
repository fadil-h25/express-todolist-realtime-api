import express from "express";
import {
  handleCreateTodo,
  handleDeleteTodoById,
  handleGetTodoById,
  handleGetTodos,
  handleUpdateTodoById,
} from "./todo-controller.js";

export const todoRouter = express.Router({ mergeParams: true });

todoRouter.get("", handleGetTodos);
todoRouter.post("", handleCreateTodo);
todoRouter.get("/:id", handleGetTodoById);

todoRouter.put("/:id", handleUpdateTodoById);
todoRouter.delete("/:id", handleDeleteTodoById);
