import { v4 as uuidv4 } from "uuid";
import noteRepository from "repositories/noteRepository";
import { parseDates } from "helpers/parseDates.utils";
import {
  NoteCreateInput,
  NoteUpdateInput,
  NoteId,
  Note,
} from "schemas/notes.schema";
import { AppError } from "helpers/appError.utils";
import { HttpCode } from "helpers/httpStatusCodes.utils";
import { Stats } from "./types";

class NoteService {
  async createNote(input: NoteCreateInput): Promise<Note> {
    const noteId = uuidv4();
    const created = new Date().toISOString();
    const newNote: Note = { ...input, id: noteId, created, archived: false };

    const datesFromContent = parseDates(input.content);
    if (datesFromContent.length > 0) {
      newNote.dates = datesFromContent;
    }

    await noteRepository.create(newNote);

    return newNote;
  }
  async getAllNotes(): Promise<Note[]> {
    const notesList = await noteRepository.findAll();

    if (notesList.length === 0) {
      throw new AppError({
        httpCode: HttpCode.NO_CONTENT,
        message: "No notes found",
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

    const { archived, ...otherInputData } = input;
    const isOtherInputDataNotEmpty = Object.keys(otherInputData).length > 0;

    if (note.archived && isOtherInputDataNotEmpty) {
      throw new AppError({
        httpCode: HttpCode.FORBIDDEN,
        message:
          "Archived notes can't be changed. To edit note, make it active first",
      });
    }

    let dates = null;
    if (input.content) {
      dates = parseDates(input.content);
    }
    const fieldsToUpdate = dates ? { ...input, dates } : input;

    await noteRepository.updateOne(id, fieldsToUpdate);
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
        message: "No notes found",
      });
    }

    const stats: Stats = {};

    for (const note of notesList) {
      const category = note.category;
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
