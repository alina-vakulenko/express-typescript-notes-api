import { z } from "zod";

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
  createdAt: z.coerce.date(),
  category_id: z.number({
    required_error: "Category id is required",
    invalid_type_error: "Category id should be an integer",
  }),
  content: z.string().min(1, "Content should not be empty").trim(),
  dates: z.array(z.coerce.date()).optional(),
  archived: z.boolean().default(false),
});

export const NoteCreateSchema = NoteSchema.pick({
  name: true,
  category_id: true,
  content: true,
});

export const NoteIdSchema = z.string().uuid();
export const ParamsWithIdSchema = z.object({ id: NoteIdSchema });
export const NoteUpdateSchema = NoteCreateSchema.partial().merge(
  z.object({ archived: z.boolean().optional() })
);

export type Note = z.infer<typeof NoteSchema>;
export type NoteCreateInput = z.infer<typeof NoteCreateSchema>;
export type NoteUpdateInput = z.infer<typeof NoteUpdateSchema>;
export type NoteId = z.infer<typeof NoteIdSchema>;
export type ParamsWithId = z.infer<typeof ParamsWithIdSchema>;
