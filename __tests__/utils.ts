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
    .send({ name: "Valid category name" });
};
