import { Request, Response } from "express";
import categoryService from "@services/categoryService";
import { asyncErrorHandler } from "@helpers/asyncErrorHandler";

export const createCategory = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const newCategory = await categoryService.createCategory(req.body);
    return res.status(201).json(newCategory);
  }
);

export const getCategories = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ count: categories.length, categories });
  }
);

export const updateCategory = asyncErrorHandler(
  async (req: Request, res: Response) => {
    await categoryService.updateCategory(req.params.slug, req.body.data);
    res.status(200).json({ message: "success" });
  }
);

export const deleteCategory = asyncErrorHandler(
  async (req: Request, res: Response) => {
    await categoryService.deleteCategory(req.params.slug);
    res.status(200).json({ message: "success" });
  }
);
