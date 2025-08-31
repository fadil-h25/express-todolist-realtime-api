import z from "zod";
import { CreateTodoSchema, UpdateTodoSchema } from "../schema/todo-schema";

export type CreateTodoRequest = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoRequest = z.infer<typeof UpdateTodoSchema>;
