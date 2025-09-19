import z from "zod";

export const isOwnerSchema = z.boolean().optional().nullable();
