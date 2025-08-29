import z from "zod";
import { CreateTodoSchema, UpdateTodoSchema } from "../schema/todo-schema";

export type TodoCreateRequest = z.infer<typeof CreateTodoSchema>;
export type TodoUpdateRequest = z.infer<typeof UpdateTodoSchema>;
