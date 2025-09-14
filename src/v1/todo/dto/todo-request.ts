import z from "zod";
import {
  CreateTodoSchema,
  DeleteTodoByIdSchema,
  GetTodoByIdSchema,
  UpdateTodoSchema,
} from "../schema/todo-schema.js";

export type CreateTodoRequest = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoRequest = z.infer<typeof UpdateTodoSchema>;
export type GetTodoByIdRequest = z.infer<typeof GetTodoByIdSchema>;
export type DeleteTodoByIdRequest = z.infer<typeof DeleteTodoByIdSchema>;
