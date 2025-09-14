import { z } from "zod";

// id otomatis UUID
export const todolistIdSchema = z.string().uuid();

// title wajib ada, max 200 karakter
export const todolistTitleSchema = z.string().min(1).max(200);

// description opsional, max 500 karakter
export const todolistDescriptionSchema = z.string().max(500).optional();

// isPublic default false
export const todolistIsPublicSchema = z.boolean().default(false);

// createdAt otomatis tanggal
export const todolistCreatedAtSchema = z.date().default(() => new Date());

// updatedAt otomatis update
export const todolistUpdatedAtSchema = z.date().default(() => new Date());

export const CreateTodolistSchema = z.object({
  title: todolistTitleSchema,
  description: todolistDescriptionSchema,
  isPublic: todolistIsPublicSchema,
});

export const UpdateTodolistSchema = z.object({
  id: todolistIdSchema,
  title: todolistTitleSchema.optional(),
  description: todolistDescriptionSchema.optional(),
  isPublic: todolistIsPublicSchema.optional(),
});
