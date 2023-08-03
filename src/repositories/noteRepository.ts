import { readFileSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { Note } from "data/schemas/notes.schema";
import AppError, { HttpCode } from "helpers/appError.utils";

const prepopulateNoteDb = () => {
  try {
    const json = readFileSync(
      path.join(__dirname, "..", "data", "data.json"),
      "utf-8"
    );
    const data: { notesList: Note[] } = JSON.parse(json);
    return data.notesList;
  } catch {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      message: "Initial DB data can't be read",
      isOperational: false,
    });
  }
};

const noteDb: { notes: Note[]; setNotes: (notes: Note[]) => void } = {
  notes: prepopulateNoteDb() || [],
  setNotes: function (notes: Note[]) {
    this.notes = notes;
  },
};

export const create = async (data: Note) => {
  noteDb.setNotes([...noteDb.notes, data]);
  await fs.writeFile(
    path.join(__dirname, "..", "data", "data.json"),
    JSON.stringify({ count: noteDb.notes.length, notesList: noteDb.notes })
  );
};

export const findAll = async () => {
  return Promise.resolve(noteDb.notes);
};

export const findById = async (id: string) => {
  return Promise.resolve(noteDb.notes.find((note) => note.id === id));
};

export const deleteOne = async (id: string) => {
  const filteredNotes = noteDb.notes.filter((note) => note.id !== id);
  noteDb.setNotes(filteredNotes);
  await fs.writeFile(
    path.join(__dirname, "..", "data", "data.json"),
    JSON.stringify({ count: noteDb.notes.length, notesList: noteDb.notes })
  );
};

export const updateOne = async (id: string, data: Partial<Note>) => {
  const updatedNotes = noteDb.notes.map((note) => {
    if (note.id !== id) {
      return note;
    } else {
      return { ...note, ...data };
    }
  });
  noteDb.setNotes(updatedNotes);
  await fs.writeFile(
    path.join(__dirname, "..", "data", "data.json"),
    JSON.stringify({ notesList: noteDb.notes })
  );
};
