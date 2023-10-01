import { Request, Response, NextFunction } from "express";
import noteService from "./noteService";
import categoryService from "./categoryService";
import { AppError } from "@helpers/appError.utils";
import { HttpCode } from "@helpers/httpStatusCodes.utils";
import {
  noteValidationService,
  categoryValidationService,
} from "./validationService";

export const handleCreateNoteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [_, validatedBody] = noteValidationService.validateCreateRequest(req);

  if (!validatedBody) {
    const error = new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
    next(error);
    return;
  }
  if (validatedBody.status === "error") {
    next(validatedBody.error);
    return;
  }

  try {
    const newNote = await noteService.createNote(validatedBody.data);
    return res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateNoteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [validatedParams, validatedBody] =
    noteValidationService.validateUpdateRequest(req);

  if (!validatedBody || !validatedParams) {
    const error = new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
    next(error);
    return;
  }

  if (validatedParams.status === "error") {
    next(validatedParams.error);
    return;
  }

  if (validatedBody.status === "error") {
    next(validatedBody.error);
    return;
  }

  try {
    await noteService.updateNote(validatedParams.data.id, validatedBody.data);
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteNoteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [validatedParams] = noteValidationService.validateDeleteRequest(req);
  if (!validatedParams) {
    const error = new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
    next(error);
    return;
  }
  if (validatedParams.status === "error") {
    next(validatedParams.error);
    return;
  }

  try {
    await noteService.deleteNote(validatedParams.data.id);

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

export const handleGetOneNoteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [validatedParams] = noteValidationService.validateGetOneRequest(req);
  if (!validatedParams) {
    const error = new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
    next(error);
    return;
  }

  if (validatedParams.status === "error") {
    next(validatedParams.error);
    return;
  }

  try {
    const note = await noteService.getNoteById(validatedParams.data.id);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const handleGetAllNotesRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await noteService.getAllNotes();
    res.status(200).json({ count: notes.length, notes: notes });
  } catch (error) {
    next(error);
  }
};

export const handleGetStatsRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await noteService.getStats();
    res.status(200).json({ stats });
  } catch (error) {
    next(error);
  }
};

export const handleCreateCategoryRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [_, validatedBody] =
    categoryValidationService.validateCreateRequest(req);

  if (!validatedBody) {
    const error = new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
    next(error);
    return;
  }

  if (validatedBody.status === "error") {
    next(validatedBody.error);
    return;
  }

  try {
    const newCategory = await categoryService.createCategory(
      validatedBody.data
    );
    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const handleGetAllCategoriesRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ count: categories.length, categories });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateCategoryRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [validatedParams, validatedBody] =
    categoryValidationService.validateUpdateRequest(req);

  if (!validatedBody || !validatedParams) {
    const error = new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
    next(error);
    return;
  }

  if (validatedParams.status === "error") {
    next(validatedParams.error);
    return;
  }

  if (validatedBody.status === "error") {
    next(validatedBody.error);
    return;
  }

  try {
    await categoryService.updateCategory(
      validatedParams.data.slug,
      validatedBody.data
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteCategoryRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [validatedParams] =
    categoryValidationService.validateDeleteRequest(req);

  if (!validatedParams) {
    const error = new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
    next(error);
    return;
  }

  if (validatedParams.status === "error") {
    next(validatedParams.error);
    return;
  }

  try {
    await categoryService.deleteCategory(validatedParams.data.slug);
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
