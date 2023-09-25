import { v4 as uuidv4 } from "uuid";
import noteRepository from "@repositories/noteRepository";
import {
  NoteCreateInput,
  NoteUpdateInput,
  NoteId,
  Note,
} from "@schemas/notes.schema";
import { AppError } from "@helpers/appError.utils";
import { HttpCode } from "@helpers/httpStatusCodes.utils";
import { Stats } from "./types";

class NoteService {
  async createNote(input: NoteCreateInput): Promise<Note> {
    const newNote = await noteRepository.create(input);
    return newNote;
  }
  async getAllNotes(): Promise<Note[]> {
    const notesList = await noteRepository.findAll();

    if (notesList.length === 0) {
      throw new AppError({
        httpCode: HttpCode.NO_CONTENT,
        message: "Notes list is empty",
      });
    }

    return notesList;
  }
  async getNoteById(id: NoteId): Promise<Note> {
    const note = await noteRepository.findById(id);

    if (!note) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Note with id ${id} was not found`,
      });
    }

    return note;
  }
  async updateNote(id: NoteId, input: NoteUpdateInput): Promise<void> {
    const note = await noteRepository.findById(id);

    if (!note) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Note with id ${id} was not found`,
      });
    }

    const { archived, ...otherInputs } = input;
    // if note is archived, only "archived" status can be changed
    const fieldsToEditExcludingArchived = Object.keys(otherInputs).length > 0;

    if (note.archived && fieldsToEditExcludingArchived) {
      throw new AppError({
        httpCode: HttpCode.FORBIDDEN,
        message: "Archived notes can't be changed",
      });
    }

    await noteRepository.updateOne(id, input);
  }

  async deleteNote(id: NoteId): Promise<void> {
    const note = await noteRepository.findById(id);

    if (!note) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Note with id ${id} was not found`,
      });
    }

    await noteRepository.deleteOne(id);
  }

  async getStats(): Promise<Stats> {
    const notesList = await noteRepository.findAll();

    if (notesList.length === 0) {
      throw new AppError({
        httpCode: HttpCode.NO_CONTENT,
        message: "Notes list is empty",
      });
    }

    const stats: Stats = {};

    for (const note of notesList) {
      const category = note.category_id;
      const status = note.archived ? "archived" : "active";

      if (!stats[category]) {
        stats[category] = { active: 0, archived: 0 };
      }

      stats[category][status]++;
    }

    return stats;
  }
}

const noteService = new NoteService();

export default noteService;
