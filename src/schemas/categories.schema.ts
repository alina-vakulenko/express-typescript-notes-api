import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number({ required_error: "Category id is required" }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name should not be empty")
    .trim(),
  createdAt: z.coerce.date(),
});

export const CategoryCreateSchema = CategorySchema.pick({
  name: true,
});

export const CategoryIdSchema = z.number();
export const ParamsWithIdSchema = z.object({ id: CategoryIdSchema });

export const CategoryUpdateSchema = CategoryCreateSchema.partial();

export type Category = z.infer<typeof CategorySchema>;
export type CategoryCreateInput = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateSchema>;
export type CategoryId = z.infer<typeof CategoryIdSchema>;
export type ParamsWithId = z.infer<typeof ParamsWithIdSchema>;
