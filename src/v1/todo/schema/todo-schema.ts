import z from "zod";

export const todoIdSchema = z.uuid();
export const todoTitleSchema = z.string().min(1);
export const todoStatusSchema = z.enum(["PENDING", "PROGRESS", "COMPLETED"]);
export const todoIsPublicSchema = z.boolean().default(false);

export const CreateTodoSchema = z.object({
  title: todoTitleSchema,
  isPublic: todoIsPublicSchema.optional().default(false),
  todoStatus: todoStatusSchema.optional().default("PENDING"),
});

export const UpdateTodoSchema = z.object({
  id: todoIdSchema,
  title: todoTitleSchema.optional(),
  isPublic: todoIsPublicSchema.optional(),
  todoStatus: todoStatusSchema.optional(),
});
