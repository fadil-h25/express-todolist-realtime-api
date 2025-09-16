import z from "zod";
import {
  CreateTodolistMemberSchema,
  GetTodolistMembersByIdSchema,
  UpdateTodolistMemberSchema,
} from "../schema/todolist-member-schema.js";

export type CreateTodolistMemberRequest = z.infer<
  typeof CreateTodolistMemberSchema
>;

export type UpdateTodolistMemberRquest = z.infer<
  typeof UpdateTodolistMemberSchema
>;

export type GetTodolistMemberByIdRequest = z.infer<
  typeof GetTodolistMembersByIdSchema
>;
