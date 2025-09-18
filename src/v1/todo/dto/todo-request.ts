import z from "zod";
import {
  CreateTodoSchema,
  DeleteTodoByIdSchema,
  GetTodoByIdSchema,
  GetTodosSchema,
  UpdateTodoSchema,
} from "../schema/todo-schema.js";

export type CreateTodoRequest = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoRequest = z.infer<typeof UpdateTodoSchema>;
export type GetTodoByIdRequest = z.infer<typeof GetTodoByIdSchema>;
export type DeleteTodoByIdRequest = z.infer<typeof DeleteTodoByIdSchema>;
export type GetTodosRequest = z.infer<typeof GetTodosSchema>;
