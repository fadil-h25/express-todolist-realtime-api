import { TodolistMemberRole } from "@prisma/client";
import z from "zod";
import { todolistIdSchema } from "../../todolist/schema/todolist-schema.js";
import { userIdSchema } from "../../user/schema/user-schema.js";

export const todolistMemberIdSchema = z.uuid();
export const todolistMemberRoleSchema = z.enum(TodolistMemberRole);

export const CreateTodolistMemberSchema = z.object({
  role: todolistMemberRoleSchema.optional(),
  todolistId: todolistIdSchema,
  userId: userIdSchema,
});

export const UpdateTodolistMemberSchema = z.object({
  id: todolistMemberIdSchema,
  role: todolistMemberRoleSchema.optional(),
  todolistId: todolistIdSchema,
});

export const GetTodolistMemberByIdSchema = z.object({
  id: todolistMemberIdSchema,
  todolistId: todolistIdSchema,
});

export const DeleteTodolistMemberSchema = z.object({
  id: todolistMemberIdSchema,
  todolistId: todolistIdSchema,
});
