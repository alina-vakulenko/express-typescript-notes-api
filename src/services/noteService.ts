import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import * as NoteRepository from "repositories/noteRepository";
import { parseDates } from "helpers/parseDates.utils";
import AppError, { HttpCode } from "helpers/appError.utils";

class NoteService {
  async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const noteId = uuidv4();
      const created = new Date().toISOString();
      const newNote = { ...req.body, id: noteId, created, archived: false };
      const datesFromContent = parseDates(req.body.content);
      if (datesFromContent.length > 0) {
        newNote.dates = datesFromContent;
      }
      await NoteRepository.create(newNote);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
  async getAllNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const notesList = await NoteRepository.findAll();

      if (notesList.length === 0) {
        throw new AppError({
          httpCode: HttpCode.NO_CONTENT,
          message: "No notes found",
        });
      }

      res.json({ count: notesList.length, notesList });
    } catch (error) {
      next(error);
    }
  }
  async getNoteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const note = await NoteRepository.findById(id);

      if (!note) {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: `Note with id ${id} was not found`,
        });
      }

      res.json(note);
    } catch (error) {
      next(error);
    }
  }
  async updateNote(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const note = NoteRepository.findById(id);

      if (!note) {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: `Note with id ${id} was not found`,
        });
      }

      let dates = null;
      if (req.body.content) {
        dates = parseDates(req.body.content);
      }
      const fieldsToUpdate = dates ? { ...req.body, dates } : req.body;
      await NoteRepository.updateOne(id, fieldsToUpdate);

      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const note = NoteRepository.findById(id);

      if (!note) {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: `Note with id ${id} was not found`,
        });
      }

      await NoteRepository.deleteOne(id);

      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  async changeToArchive(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const note = NoteRepository.findById(id);

      if (!note) {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: `Note with id ${id} was not found`,
        });
      }

      await NoteRepository.updateOne(id, { archived: true });
    } catch (error) {
      next(error);
    }
  }
  async changeToUnarchive(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const note = NoteRepository.findById(id);

      if (!note) {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: `Note with id ${id} was not found`,
        });
      }

      await NoteRepository.updateOne(id, { archived: false });
    } catch (error) {
      next(error);
    }
  }
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const notesList = await NoteRepository.findAll();

      if (notesList.length === 0) {
        throw new AppError({
          httpCode: HttpCode.NO_CONTENT,
          message: "No notes found",
        });
      }

      res.json({ count: notesList.length, notesList });

      const stats: {
        [category: string]: Record<string, number>;
      } = {};

      for (const note of notesList) {
        const category = note.category;
        const status = note.archived ? "archived" : "active";

        if (!stats[category]) {
          stats[category] = {};
        }
        if (!stats[category][status]) {
          stats[category][status] = 0;
        }
        stats[category][status]++;
      }

      res.json({ stats });
    } catch (error) {
      next(error);
    }
  }
}

const noteService = new NoteService();

export default noteService;
