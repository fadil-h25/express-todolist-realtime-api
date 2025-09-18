import z from "zod";
import { TodoStatus } from "../enum/todo-enum.js";
import { todolistIdSchema } from "../../todolist/schema/todolist-schema.js";

export const todoIdSchema = z.uuid();
export const todoTitleSchema = z.string().min(1);
export const todoStatusSchema = z.enum(TodoStatus);
export const todoIsPublicSchema = z.boolean().default(false);
export const todoDescriptionSchema = z.string().optional();

export const CreateTodoSchema = z.object({
  title: todoTitleSchema,
  description: todoDescriptionSchema,
  todoStatus: todoStatusSchema.optional().default(TodoStatus.PROGRESS),
  todolistId: todolistIdSchema,
  isOwner: z.boolean().optional().nullable(),
});

export const UpdateTodoSchema = z.object({
  todolistId: todolistIdSchema,
  id: todoIdSchema,
  title: todoTitleSchema.optional().nullable(),
  status: todoStatusSchema.optional().nullable(),
  description: todoDescriptionSchema.optional().nullable(),
  isOwner: z.boolean().optional().nullable(),
});

export const GetTodoByIdSchema = z.object({
  todolistId: todoIdSchema,
  id: todoIdSchema,
  isOwner: z.boolean().optional().nullable(),
});

export const GetTodosSchema = z.object({
  todolistId: todoIdSchema,
  isOwner: z.boolean().optional().nullable(),
});

export const DeleteTodoByIdSchema = z.object({
  todolistId: todoIdSchema,
  id: todoIdSchema,
  isOwner: z.boolean().optional().nullable(),
});
