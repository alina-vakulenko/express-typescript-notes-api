import { v4 as uuid } from "uuid";
export const firstTestDate = new Date("2023-08-2").toISOString();
export const secontTestDate = new Date("2023-08-03").toISOString();
export const noteIdValidNotExisting = uuid();

export const statsObject = {
  "1": {
    active: 34,
    archived: 0,
  },
  "2": {
    active: 2,
    archived: 1,
  },
  "3": {
    active: 6,
    archived: 1,
  },
};

export const noteCreateInput = {
  name: "Test note",
  category_id: 3,
  content:
    "This is the first date 8/2/2023, and this is the second date 08/03/2023",
};

export const noteUpdateInput = {
  name: "Name of updated note",
  category_id: 1,
  content: "Content of updated note",
  archived: true,
};

export const invalidNoteCreateInput = {
  name: "",
  category_id: 4,
  dates: ["September, 1st"],
};

export const invalidNoteUpdateInput = {
  name: "Update should not happen",
  category_id: 3,
  dates: [],
  createdAt: "today",
};
