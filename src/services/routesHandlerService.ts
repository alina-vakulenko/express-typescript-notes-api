import { Request, Response, NextFunction } from "express";
import { validate } from "./validationService";
import noteService from "./noteService";
import {
  NoteCreateSchema,
  NoteUpdateSchema,
  ParamsWithIdSchema,
  NoteCreateInput,
  NoteUpdateInput,
  ParamsWithId,
} from "schemas/notes.schema";

export const handleCreateNoteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedBody = validate<NoteCreateInput>(req.body, NoteCreateSchema);

    if (validatedBody.status === "error") {
      next(validatedBody.error);
      return;
    }

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
  try {
    const validatedParams = validate<ParamsWithId>(
      req.params,
      ParamsWithIdSchema
    );

    if (validatedParams.status === "error") {
      next(validatedParams.error);
      return;
    }

    const validatedBody = validate<NoteUpdateInput>(req.body, NoteUpdateSchema);

    if (validatedBody.status === "error") {
      next(validatedBody.error);
      return;
    }

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
  try {
    const validatedParams = validate<ParamsWithId>(
      req.params,
      ParamsWithIdSchema
    );

    if (validatedParams.status === "error") {
      next(validatedParams.error);
      return;
    }

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
  try {
    const validatedParams = validate<ParamsWithId>(
      req.params,
      ParamsWithIdSchema
    );

    if (validatedParams.status === "error") {
      next(validatedParams.error);
      return;
    }

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
