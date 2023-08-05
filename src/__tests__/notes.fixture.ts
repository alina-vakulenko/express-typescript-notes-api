import { v4 as uuidv4 } from "uuid";

export const noteIdInvalid = "123456";
export const noteIdValidNotExisting = uuidv4();
export const noteIdValidExisting = "1b922614-b291-4073-8f03-6fe780e9a133";

export const firstTestDate = new Date("2023-08-2").toISOString();
export const secontTestDate = new Date("2023-08-03").toISOString();

export const existingNote = {
  id: "1b922614-b291-4073-8f03-6fe780e9a133",
  name: "Test note",
  category: "Idea",
  content: "Content of idea note",
  created: "2023-08-04T19:56:59.623Z",
  archived: false,
};

export const statsObject = {
  Idea: { archived: 0, active: 1 },
  Task: { archived: 1, active: 0 },
  "Random Thought": { archived: 1, active: 0 },
};

export const noteCreateInput = {
  name: "Test note",
  category: "Idea",
  content: "Test content",
};

export const noteUpdateInput = {
  name: "Name of updated note",
  category: "Task",
  content: "Content of updated note",
};

export const archivedNoteId = "368e43ec-dd2c-48dd-8d35-c3a7cef44313";

export const invalidNoteCreateInput = {
  name: "",
  category: "Reminder",
  dates: "September, 1st",
};

export const invalidNoteUpdateInput = {
  name: "Update should not happen",
  id: noteIdValidExisting,
  category: "Dangerous",
  dates: [],
  created: "today",
};

export const noteCreateInputWithDates = {
  name: "Another test name",
  category: "Task",
  content:
    "This is the first date 8/2/2023, and this is the second date 08/03/2023",
};

export const wrongNoteCreateInput = {
  id: noteIdInvalid,
  category: "Sport",
  content:
    "Test content with dates. This is first date 8/3/2023, and this is the second date 09/01/2023",
};

export const initialData = [
  {
    id: "1b922614-b291-4073-8f03-6fe780e9a133",
    name: "Test note",
    category: "Idea",
    content: "Content of idea note",
    created: "2023-08-04T19:56:59.623Z",
    archived: false,
  },
  {
    id: "72299505-e91e-4de8-8675-ab1b71bd2809",
    name: "Another test name",
    category: "Task",
    content:
      "This is the first date 8/2/2023, and this is the second date 08/03/2023",
    created: "2023-08-04T19:56:59.663Z",
    archived: true,
    dates: ["2023-08-01T21:00:00.000Z", "2023-08-03T00:00:00.000Z"],
  },
  {
    id: "368e43ec-dd2c-48dd-8d35-c3a7cef44313",
    name: "Third note",
    category: "Random Thought",
    content: "Content of random thought note",
    created: "2023-08-04T20:24:07.453Z",
    archived: true,
  },
];
