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
});

export const UpdateTodoSchema = z.object({
  todolistId: todolistIdSchema,
  id: todoIdSchema,
  title: todoTitleSchema.optional(),
  todoStatus: todoStatusSchema.optional().default(TodoStatus.PROGRESS),
  description: todoDescriptionSchema.optional(),
});

export const GetTodoByIdSchema = z.object({
  todolistId: todoIdSchema,
  id: todoIdSchema,
});

export const DeleteTodoByIdSchema = z.object({
  todolistId: todoIdSchema,
  id: todoIdSchema,
});
