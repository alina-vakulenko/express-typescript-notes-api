import { v4 as uuid } from "uuid";
export const firstTestDate = new Date("2023-08-2").toISOString();
export const secontTestDate = new Date("2023-08-03").toISOString();
export const noteIdValidNotExisting = uuid();

export const statsObject = {
  active: {
    task: 5,
  },
  archived: {
    task: 1,
  },
};

export const noteCreateInput = {
  name: "Test note",
  content: "Content of test note",
};

export const noteUpdateInput = {
  name: "Name of updated note",
  content:
    "This is the first date 8/2/2023, and this is the second date 08/03/2023.",
};

export const invalidNoteCreateInput = {
  name: "",
  categoryId: 4,
  dates: ["September, 1st"],
};

export const invalidNoteUpdateInput = {
  name: "Update should not happen",
  categoryId: 3,
  dates: [],
  createdAt: "today",
};
