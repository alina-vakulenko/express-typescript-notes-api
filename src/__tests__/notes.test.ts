import request from "supertest";
import app from "app";
import { Note } from "schemas/notes.schema";
import { db } from "repositories/noteRepository";
import * as testData from "./notes.fixture";

it("GET /notes -> responds with a 204 status if the notes array is empty", (done) => {
  request(app)
    .get("/notes")
    .set("Accept", "application/json")
    .expect(204, done);
});

describe("Notes array is not empty", () => {
  beforeAll(() => db.save(testData.initialData as Note[]));

  describe("GET /notes", () => {
    it("responds with an array of notes and the number of items in the array", async () =>
      request(app)
        .get("/notes")
        .set("Accept", "application/json")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("notes");
          expect(response.body).toHaveProperty("count");
          expect(response.body.count).toBe(response.body.notes.length);
          expect(response.body.notes).toEqual(
            expect.arrayContaining([testData.existingNote])
          );
        }));
  });

  describe("GET /notes/stats", () => {
    it("responds with a stats object containing the number of notes by categories", async () =>
      request(app)
        .get("/notes/stats")
        .set("Accept", "application/json")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("stats");
          expect(response.body.stats).toEqual(testData.statsObject);
        }));
  });

  describe("GET /notes/:id", () => {
    it("responds with a single note object", async () =>
      request(app)
        .get(`/notes/${testData.noteIdValidExisting}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(testData.existingNote);
        }));
    it("responds with an 'Invalid request' message if the id is invalid", async () => {
      request(app)
        .get(`/notes/${testData.noteIdInvalid}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Invalid request");
          expect(response.body.issues.length).toBeGreaterThan(0);
        });
    });
    it("responds with a not found error if the id doesn't exist in db", (done) => {
      request(app)
        .get(`/notes/${testData.noteIdValidNotExisting}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404, done);
    });
  });

  describe("POST /notes", () => {
    it("responds with the newly created note object with an auto generated id, time of creation, and an archived flag with a false value by default", async () =>
      request(app)
        .post("/notes")
        .set("Accept", "application/json")
        .send(testData.noteCreateInput)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.statusCode).toBe(201);
          expect(response.body).toHaveProperty("id");
          expect(response.body).toHaveProperty("created");
          expect(response.body).toHaveProperty("archived");
          expect(response.body.archived).toBe(false);
        }));
    it("extracts dates from content into the 'dates' property", async () =>
      request(app)
        .post("/notes")
        .set("Accept", "application/json")
        .send(testData.noteCreateInputWithDates)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.statusCode).toBe(201);
          expect(response.body).toHaveProperty("dates");
          expect(response.body.dates).toEqual(
            expect.arrayContaining([
              testData.firstTestDate,
              testData.secontTestDate,
            ])
          );
        }));
    it("skips the dates property if dates can't be parsed from the content", async () =>
      request(app)
        .post("/notes")
        .set("Accept", "application/json")
        .send({
          name: "Valid name",
          category: "Random Thought",
          content: "Remind me 1st of September",
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.statusCode).toBe(201);
          expect(response.body).not.toHaveProperty("dates");
        }));
    it("responds with an array of validation issues if the request is incorrect", async () =>
      request(app)
        .post("/notes")
        .set("Accept", "application/json")
        .send(testData.invalidNoteCreateInput)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Invalid request");
          expect(response.body.issues.length).toBeGreaterThan(0);
        }));
  });

  describe("PATCH /notes/:id", () => {
    it("responds with an 'Invalid request' message if the id is invalid", async () => {
      request(app)
        .patch(`/notes/${testData.noteIdInvalid}`)
        .set("Accept", "application/json")
        .send({
          name: "Updating name",
          category: "Task",
          content: "Updating content",
        })
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Invalid request");
          expect(response.body.issues.length).toBeGreaterThan(0);
        });
    });
    it("responds with a not found error if the id doesn't exist in db", (done) => {
      request(app)
        .patch(`/notes/${testData.noteIdValidNotExisting}`)
        .set("Accept", "application/json")
        .send({
          name: "Updating name",
          category: "Task",
          content: "Updating content",
        })
        .expect("Content-Type", /json/)
        .expect(404, done);
    });
    it("responds with an array of validation issues if request is incorrect", async () =>
      request(app)
        .patch(`/notes/${testData.noteIdValidExisting}`)
        .set("Accept", "application/json")
        .send(testData.invalidNoteUpdateInput)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Invalid request");
          expect(response.body.issues.length).toBeGreaterThan(0);
        }));
    it("responds with a 200 status code and a success message with the correct request data", async () => {
      request(app)
        .patch(`/notes/${testData.noteIdValidExisting}`)
        .send(testData.noteUpdateInput)
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("success");
        });
    });
    it("responds with a 403 status code if the note is archived", async () => {
      request(app)
        .patch(`/notes/${testData.archivedNoteId}`)
        .send(testData.noteUpdateInput)
        .expect(403)
        .then((response) => {
          expect(response.body.message).toBe(
            "Archived notes can't be changed. To edit note, make it active first"
          );
        });
    });
    it("allows to change archived status", async () => {
      request(app)
        .patch(`/notes/${testData.archivedNoteId}`)
        .send({ archived: false })
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("success");
        });
    });
  });

  describe("Editing content with dates", () => {
    it("allows to edit content", async () => {
      request(app)
        .patch("/notes/368e43ec-dd2c-48dd-8d35-c3a7cef44313")
        .send({ content: "01/01/2023 new content with dates" })
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("success");
        });
    });
    it("changes extracted dates if content was edited", async () => {
      request(app)
        .get("/notes/368e43ec-dd2c-48dd-8d35-c3a7cef44313")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("dates");
          expect(response.body.dates).toEqual(
            expect.arrayContaining(["2023-01-01T00:00:00.000Z"])
          );
        });
    });
  });

  describe("DELETE /notes/:id", () => {
    it("responds with an 'Invalid request' message if the id is invalid", async () => {
      request(app)
        .delete(`/notes/${testData.noteIdInvalid}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Invalid request");
          expect(response.body.issues.length).toBeGreaterThan(0);
        });
    });
    it("responds with a not found error if the id doesn't exist in db", (done) => {
      request(app)
        .delete(`/notes/${testData.noteIdValidNotExisting}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404, done);
    });
    it("responds with a 200 status code and a success message", async () => {
      request(app)
        .delete(`/notes/${testData.noteIdValidExisting}}`)
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("success");
        });
    });
  });
});
