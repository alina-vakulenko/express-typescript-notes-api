import noteRepository from "@repositories/noteRepository";
import {
  CreateNoteInput,
  UpdateNoteInput,
  NoteId,
  Note,
} from "@schemas/notes.schema";
import { AppError } from "@helpers/appError.utils";
import { HttpCode } from "@helpers/httpStatusCodes.utils";
import { Category } from "@schemas/categories.schema";

type NoteStatsByStatus = Record<Category["slug"], number>;
type Stats = Record<"active" | "archived", NoteStatsByStatus>;

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
    const existingNote = await noteRepository.findById(id);
    console.log("note to update", existingNote);
    if (!existingNote) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Note with id ${id} was not found`,
      });
    }

    const { archived, ...otherInputs } = input;
    // if note is archived, only "archived" status can be changed
    const fieldsToEditExcludingArchived = Object.keys(otherInputs).length > 0;

    if (existingNote.archived && fieldsToEditExcludingArchived) {
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

    const stats: Stats = { active: {}, archived: {} };

    for (const note of notesList) {
      const status = note.archived ? "archived" : "active";

      if (note.category) {
        const categorySlug = note.category.slug;
        const categoryStats = stats[status][categorySlug];
        stats[status][categorySlug] = categoryStats + 1 || 1;
      } else {
        stats[status]["withoutCategory"] =
          stats[status]["withoutCategory"] + 1 || 1;
      }
    }

    return stats;
  }
}

const noteService = new NoteService();

export default noteService;
