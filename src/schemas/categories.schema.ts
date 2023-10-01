import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number({ required_error: "Category id is required" }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name should not be empty")
    .trim(),
  slug: z
    .string({
      required_error: "Slug is required",
    })
    .min(1, "Slug should not be empty")
    .trim(),
  createdAt: z.coerce.date(),
});

export const CreateCategorySchema = CategorySchema.pick({
  name: true,
});
export const UpdateCategorySchema = CreateCategorySchema.partial();

export const ParamsWithSlugSchema = CategorySchema.pick({ slug: true });

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
