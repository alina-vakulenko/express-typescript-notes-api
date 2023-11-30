import { Request, Response } from "express";
import { asyncErrorHandler } from "@helpers/asyncErrorHandler";
import categoryService from "@services/categoryService";

export const createCategory = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const newCategory = await categoryService.createCategory(req.body);
    return res.status(201).json(newCategory);
  }
);

export const getCategories = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const response = await categoryService.getAllCategories();
    res.status(200).json(response);
  }
);

export const updateCategory = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const updatedCategory = await categoryService.updateCategory(
      req.params.slug,
      req.body
    );
    res.status(200).json(updatedCategory);
  }
);

export const deleteCategory = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const response = await categoryService.deleteCategory(req.params.slug);
    res.status(200).json(response);
  }
);
