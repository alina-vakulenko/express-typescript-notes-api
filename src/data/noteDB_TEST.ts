import { Note } from "schemas/notes.schema";
import { NoteDb } from "./noteDB";

export const createTestDb = (): NoteDb => {
  return {
    notes: [],
    save: async function (notes: Note[]) {
      this.notes = notes;
    },
  };
};
