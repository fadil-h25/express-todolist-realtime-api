import z from "zod";
import {
  CreateTodolistSchema,
  UpdateTodolistSchema,
} from "../schema/todolist-schema";

export type CreateTodolistRequest = z.infer<typeof CreateTodolistSchema>;
export type UpdateTodolistRequest = z.infer<typeof UpdateTodolistSchema>;
