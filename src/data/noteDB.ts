import fs from "fs/promises";
import { readFileSync, existsSync } from "fs";
import errorHandler from "@services/errorHandlerService";
import { Note } from "@schemas/notes.schema";
import { AppError } from "@helpers/appError.utils";
import { HttpCode } from "@helpers/httpStatusCodes.utils";

export type NoteDb = { notes: Note[]; save: (data: Note[]) => Promise<void> };

export const getInitialNotesData = (pathToData: string) => {
  if (existsSync(pathToData)) {
    const json = readFileSync(pathToData, "utf-8");
    const data: { notes: Note[] } = JSON.parse(json);

    if (!data.notes) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        message: `Property "notes" not found in ${pathToData}`,
        isOperational: false,
      });
    }

    if (!Array.isArray(data.notes)) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        message: "Notes expected to be an array",
        isOperational: false,
      });
    }

    return data.notes;
  }

  throw new AppError({
    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    message: `File ${pathToData} not found`,
    isOperational: false,
  });
};

export const prepopulateDB = (db: NoteDb, pathToData: string) => {
  try {
    const notesInitialData = getInitialNotesData(pathToData);
    if (notesInitialData.length === 0) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        message: "Initial notes data should not be emty",
        isOperational: false,
      });
    }
    db.save(notesInitialData);
  } catch (error) {
    errorHandler.handleError(error as Error);
  }
};

export const createNoteDb = (pathToStorage: string) => {
  const noteDb: NoteDb = {
    notes: [],
    save: async function (notes: Note[]) {
      this.notes = notes;
      await fs.writeFile(pathToStorage, JSON.stringify({ notes }));
    },
  };

  return noteDb;
};
