import { Request, Response } from "express";
import noteService from "@services/noteService";
import { asyncErrorHandler } from "@helpers/asyncErrorHandler";

export const createNote = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const newNote = await noteService.createNote(req.body);
    return res.status(201).json(newNote);
  }
);

export const updateNote = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const response = await noteService.updateNote(req.params.id, req.body);
    res.status(200).json(response);
  }
);

export const deleteNote = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const response = await noteService.deleteNote(req.params.id);
    res.status(200).json(response);
  }
);

export const getNoteById = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const note = await noteService.getNoteById(req.params.id);
    res.status(200).json(note);
  }
);

export const getNotes = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const response = await noteService.getAllNotes();
    res.status(200).json(response);
  }
);

export const getNotesStats = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const response = await noteService.getStats();
    res.status(200).json(response);
  }
);
