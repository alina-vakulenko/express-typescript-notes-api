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
  content: z.string().trim(),
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

export const PathIdSchema = z.object({ id: z.string().uuid() });

export const NoteUpdateSchema = z
  .object({
    data: NoteCreateSchema.partial(),
  })
  .merge(PathIdSchema);

export type Note = z.infer<typeof NoteSchema>;
export type NoteCreateInput = z.infer<typeof NoteCreateSchema>;
export type NoteUpdateInput = z.infer<typeof NoteUpdateSchema>;
export type PathId = z.infer<typeof PathIdSchema>;
