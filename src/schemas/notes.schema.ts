import { z } from "zod";
import { CategorySchema } from "./categories.schema";

export const NoteSchema = z.object({
  id: z
    .string({
      required_error: "Id is required",
    })
    .uuid({ message: "Invalid id" }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name should not be empty")
    .trim(),
  categoryId: z.number().nullable(),
  category: CategorySchema.optional(),
  content: z.string().min(1, "Content should not be empty").trim(),
  dates: z.array(z.coerce.date()).optional(),
  archived: z.boolean().default(false),
  createdAt: z.coerce.date(),
});

export const CreateNoteSchema = NoteSchema.pick({
  name: true,
  content: true,
});

export const NoteIdSchema = z.string().uuid();
export const ParamsWithNoteIdSchema = z.object({ id: NoteIdSchema });
export const UpdateNoteSchema = CreateNoteSchema.partial().merge(
  z.object({ archived: z.boolean().optional() })
);

export type Note = z.infer<typeof NoteSchema>;
export type CreateNoteInput = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteInput = z.infer<typeof UpdateNoteSchema>;
export type NoteId = z.infer<typeof NoteIdSchema>;
