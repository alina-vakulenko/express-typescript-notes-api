import { Note } from "@schemas/notes.schema";
import { requestWithSupertest } from "./config";
import * as testData from "./notes.fixture";

export const createRandomNote = async () => {
  return await requestWithSupertest
    .post("/notes")
    .set("Accept", "application/json")
    .send(testData.noteCreateInput);
};

export const createRandomCategory = async () => {
  return await requestWithSupertest
    .post("/categories")
    .set("Accept", "application/json")
    .send({ name: "category" });
};

export const prepareNoteObject = (note: Note) => {
  const { categoryId, ...noteData } = note;
  if (!categoryId) {
    return { ...noteData, category: null };
  }
  return noteData;
};
