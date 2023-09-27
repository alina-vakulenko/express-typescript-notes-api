import request from "supertest";
import app from "../src/app";
import * as testData from "./notes.fixture";
import { Note } from "./../src/schemas/notes.schema";

const requestWithSupertest = request(app);

describe("GET /notes", () => {
  it("responds with a non-emty array and a number of items in the array", async () => {
    const res = await requestWithSupertest
      .get("/notes")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("notes");
    expect(res.body).toHaveProperty("count");
    expect(res.body.count).toBe(res.body.notes.length);
    expect(res.body.notes.length).toBeGreaterThan(0);
  });
});

describe("If an id passed as a query parameter is invalid", () => {
  it("responds with a 400 status code on GET request", async () => {
    const res = await requestWithSupertest
      .get(`/notes/invalidId`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.message).toBe("Invalid request");
    expect(res.body.issues.length).toBeGreaterThan(0);
  });
  it("responds with a 400 status code on PATCH request", async () => {
    const res = await requestWithSupertest
      .patch("/notes/invalidId")
      .set("Accept", "application/json")
      .send({
        name: "Note should not be created",
        categoryId: 1,
        content: "Id is invalid",
      });

    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.message).toBe("Invalid request");
    expect(res.body.issues.length).toBeGreaterThan(0);
  });
  it("responds with a 400 status code on DELETE request", async () => {
    const res = await requestWithSupertest
      .delete("/notes/invalidId")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.message).toBe("Invalid request");
    expect(res.body.issues.length).toBeGreaterThan(0);
  });
});

describe("If an id passed as a query parameter doesn't exist in a DB", () => {
  it("responds with a 404 status code on GET request", async () => {
    const res = await requestWithSupertest
      .get(`/notes/${testData.noteIdValidNotExisting}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(404);
  });
  it("responds with a 404 status code on PATCH request", async () => {
    const res = await requestWithSupertest
      .patch(`/notes/${testData.noteIdValidNotExisting}`)
      .set("Accept", "application/json")
      .send({
        name: "Note should not be created",
        categoryId: 1,
        content: "Id does not exist",
      });

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(404);
  });
  it("responds with a 404 status code on DELETE request", async () => {
    const res = await requestWithSupertest
      .delete(`/notes/${testData.noteIdValidNotExisting}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(404);
  });
});

let createdNote: Note;
describe("queries on test note", () => {
  beforeAll(async () => {
    const res = await requestWithSupertest
      .post("/notes")
      .set("Accept", "application/json")
      .send(testData.noteCreateInput);
    createdNote = res.body;
  });
  afterAll(async () => {
    await requestWithSupertest.delete(`/notes/${createdNote.id}`);
    createdNote = {} as Note;
  });

  describe("GET /notes/:id", () => {
    it("responds with a single note object", async () => {
      const res = await requestWithSupertest
        .get(`/notes/${createdNote.id}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body).toEqual(createdNote);
    });
  });

  describe("PATCH /notes/:id", () => {
    it("responds with a 400 status code and an array of validation issues if request is incorrect", async () => {
      const res = await requestWithSupertest
        .patch(`/notes/${createdNote.id}`)
        .set("Accept", "application/json")
        .send(testData.invalidNoteUpdateInput);

      expect(res.statusCode).toBe(400);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.message).toBe("Invalid request");
      expect(res.body.issues.length).toBeGreaterThan(0);
    });
    it("responds with a 200 status code and a success message if request is correct", async () => {
      const res = await requestWithSupertest
        .patch(`/notes/${createdNote.id}`)
        .set("Accept", "application/json")
        .send(testData.noteUpdateInput);

      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.message).toBe("success");
    });
    it("responds with a 403 status code and a warning message if the note is archived", async () => {
      const res = await requestWithSupertest
        .patch(`/notes/${createdNote.id}`)
        .set("Accept", "application/json")
        .send(testData.noteUpdateInput);

      expect(res.statusCode).toBe(403);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.message).toBe("Archived notes can't be changed");
    });
    it("allows to unarchive the note", async () => {
      const res = await requestWithSupertest
        .patch(`/notes/${createdNote.id}`)
        .set("Accept", "application/json")
        .send({ archived: false });

      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.message).toBe("success");
    });
    it("allows to edit active note", async () => {
      const res = await requestWithSupertest
        .patch(`/notes/${createdNote.id}`)
        .set("Accept", "application/json")
        .send({ content: "01/01/2023 new content with dates" });

      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.message).toBe("success");
    });
    it("changes extracted dates if content was edited", async () => {
      const res = await requestWithSupertest
        .get(`/notes/${createdNote.id}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.dates).toEqual(
        expect.arrayContaining(["2023-01-01T00:00:00.000Z"])
      );
    });
  });
});

describe("POST /notes", () => {
  it("responds with a 201 status code and the generated note object", async () => {
    const res = await requestWithSupertest
      .post("/notes")
      .set("Accept", "application/json")
      .send(testData.noteCreateInput);

    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("dates");
    expect(res.body).toHaveProperty("archived");
    expect(res.body.archived).toBe(false);
    expect(res.body.dates).toEqual(
      expect.arrayContaining([testData.firstTestDate, testData.secontTestDate])
    );

    await requestWithSupertest.delete(`/notes/${res.body.id}`);
  });
  it("responds with a 400 status code and an array of validation issues if the request is incorrect", async () => {
    const res = await requestWithSupertest
      .post("/notes")
      .set("Accept", "application/json")
      .send(testData.invalidNoteCreateInput);

    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.message).toBe("Invalid request");
    expect(res.body.issues.length).toBeGreaterThan(0);
  });
});

describe("DELETE /notes/:id", () => {
  beforeAll(async () => {
    const res = await requestWithSupertest
      .post("/notes")
      .set("Accept", "application/json")
      .send(testData.noteCreateInput);
    createdNote = res.body;
  });

  it("responds with a 200 status code and a success message", async () => {
    const res = await requestWithSupertest.delete(`/notes/${createdNote.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("success");
  });
});

describe("GET /notes/stats", () => {
  it("responds with an object containing the number of notes by categories", async () => {
    const res = await requestWithSupertest
      .get("/notes/stats")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("stats");
    expect(res.body.stats).toEqual(testData.statsObject);
  });
});
