import z from "zod";

const todoIdSchema = z.uuid();
const todoTitleSchema = z.string().min(1);
const todoStatusSchema = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);
const todoIsPublicSchema = z.boolean().default(false);

export const CreateTodoSchema = z.object({
  title: todoTitleSchema,
  isPublic: todoIsPublicSchema.optional(),
  todoStatus: todoStatusSchema.optional(),
});

export const UpdateTodoSchema = z.object({
  id: todoIdSchema,
  title: todoTitleSchema.optional(),
  isPublic: todoIsPublicSchema.optional(),
  todoStatus: todoStatusSchema.optional(),
});
