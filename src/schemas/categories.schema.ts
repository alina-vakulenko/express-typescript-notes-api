import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string({
    required_error: "Id is required",
  }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name should not be empty")
    .trim(),
  createdAt: z
    .string({
      required_error: "Date of creation is required",
    })
    .datetime({ message: "Invalid datetime string! Must be UTC." }),
});

export const CategoryCreateSchema = CategorySchema.pick({
  name: true,
});

export const CategoryIdSchema = z.number();
export const ParamsWithIdSchema = z.object({ id: CategoryIdSchema });

export const CategoryUpdateSchema = CategorySchema.omit({
  id: true,
  createdAt: true,
}).partial();

export type Category = z.infer<typeof CategorySchema>;
export type CategoryCreateInput = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateSchema>;
export type CategoryId = z.infer<typeof CategoryIdSchema>;
export type ParamsWithId = z.infer<typeof ParamsWithIdSchema>;
