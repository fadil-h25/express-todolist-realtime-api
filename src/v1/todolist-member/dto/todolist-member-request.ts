import z from "zod";
import { CreateTodolistMemberSchema } from "../schema/todolist-member-schema.js";

export type CreateTodolistMemberRequest = z.infer<
  typeof CreateTodolistMemberSchema
>;
