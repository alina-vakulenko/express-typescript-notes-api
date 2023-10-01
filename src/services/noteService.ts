import noteRepository from "@repositories/noteRepository";
import {
  CreateNoteInput,
  UpdateNoteInput,
  NoteId,
  Note,
} from "@schemas/notes.schema";
import { AppError } from "@helpers/appError.utils";
import { HttpCode } from "@helpers/httpStatusCodes.utils";

export type Stats = {
  [category: string]: Record<"active" | "archived", number>;
};

class NoteService {
  async createNote(input: CreateNoteInput): Promise<Note> {
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
  async updateNote(id: NoteId, input: UpdateNoteInput): Promise<void> {
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
      if (note.category) {
        const categorySlug = note.category.slug;

        stats[categorySlug].active =
          Math.max(stats[categorySlug].active, 0) + 1;
        stats[categorySlug].archived =
          Math.max(stats[categorySlug].archived, 0) + 1;
      } else {
        stats["withoutCategory"].active =
          Math.max(stats["withoutCategory"].active, 0) + 1;
        stats["withoutCategory"].archived =
          Math.max(stats["withoutCategory"].archived, 0) + 1;
      }
    }

    return stats;
  }
}

const noteService = new NoteService();

export default noteService;
