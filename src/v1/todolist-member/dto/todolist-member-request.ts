import z from "zod";
import {
  CreateTodolistMemberSchema,
  DeleteTodolistMemberSchema,
  GetTodolistMemberByIdSchema,
  UpdateTodolistMemberSchema,
} from "../schema/todolist-member-schema.js";

export type CreateTodolistMemberRequest = z.infer<
  typeof CreateTodolistMemberSchema
>;

export type UpdateTodolistMemberRquest = z.infer<
  typeof UpdateTodolistMemberSchema
>;

export type GetTodolistMemberByIdRequest = z.infer<
  typeof GetTodolistMemberByIdSchema
>;

export type DeleteTodolistMemberRequest = z.infer<
  typeof DeleteTodolistMemberSchema
>;
