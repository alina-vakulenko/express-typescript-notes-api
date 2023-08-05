import { boolean, z } from "zod";

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
  created: z
    .string({
      required_error: "Date of creation is required",
    })
    .datetime({ message: "Invalid datetime string! Must be UTC." }),
  category: z.enum(["Task", "Idea", "Random Thought"], {
    errorMap: (issue, ctx) => {
      return { message: "Invalid category" };
    },
  }),
  content: z.string().min(1, "Content should not be empty").trim(),
  dates: z
    .array(
      z.string().datetime({ message: "Invalid datetime string! Must be UTC." })
    )
    .optional(),
  archived: z.boolean().default(false),
});

export const NoteCreateSchema = NoteSchema.pick({
  name: true,
  category: true,
  content: true,
});

export const NoteIdSchema = z.string().uuid();
export const ParamsWithIdSchema = z.object({ id: NoteIdSchema });

export const NoteUpdateSchema = NoteSchema.omit({
  id: true,
  created: true,
  dates: true,
}).partial();

export type Note = z.infer<typeof NoteSchema>;
export type NoteCreateInput = z.infer<typeof NoteCreateSchema>;
export type NoteUpdateInput = z.infer<typeof NoteUpdateSchema>;
export type NoteId = z.infer<typeof NoteIdSchema>;
export type ParamsWithId = z.infer<typeof ParamsWithIdSchema>;
