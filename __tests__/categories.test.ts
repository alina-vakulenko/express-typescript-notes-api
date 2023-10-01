import { Category } from "@schemas/categories.schema";
import { requestWithSupertest } from "./config";
import { createRandomCategory } from "./utils";
import { v4 as uuid } from "uuid";

const categoryIdValidNotExisting = uuid();

describe("GET /categories", () => {
  it("responds with a non-emty array and a number of items in the array", async () => {
    const res = await requestWithSupertest
      .get("/categories")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("categories");
    expect(res.body).toHaveProperty("count");
    expect(res.body.count).toBe(res.body.categories.length);
    expect(res.body.categories.length).toBeGreaterThan(0);
  });
});

describe("If an id passed as a query parameter is invalid", () => {
  it("responds with a 400 status code on GET request", async () => {
    const res = await requestWithSupertest
      .get(`/categories/invalidId`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.message).toBe("Invalid request");
    expect(res.body.issues.length).toBeGreaterThan(0);
  });
  it("responds with a 400 status code on PATCH request", async () => {
    const res = await requestWithSupertest
      .patch("/categories/invalidId")
      .set("Accept", "application/json")
      .send({
        name: "Update is not allowed",
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
      .delete("/categories/invalidId")
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
      .get(`/categories/${categoryIdValidNotExisting}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(404);
  });
  it("responds with a 404 status code on PATCH request", async () => {
    const res = await requestWithSupertest
      .patch(`/categories/${categoryIdValidNotExisting}`)
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
      .delete(`/categories/${categoryIdValidNotExisting}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(404);
  });
});

let createdCategory: Category;
describe("queries on test category", () => {
  beforeAll(async () => {
    const res = await createRandomCategory();
    createdCategory = res.body;
  });
  afterAll(async () => {
    await requestWithSupertest.delete(`/categories/${createdCategory.id}`);
    createdCategory = {} as Category;
  });

  describe("PATCH /categories/:slug", () => {
    it("responds with a 400 status code and an array of validation issues if request is incorrect", async () => {
      const res = await requestWithSupertest
        .patch(`/categories/${createdCategory.id}`)
        .set("Accept", "application/json")
        .send({ slug: "slug" });

      expect(res.statusCode).toBe(400);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.message).toBe("Invalid request");
      expect(res.body.issues.length).toBeGreaterThan(0);
    });
    it("responds with a 200 status code and a success message if request is correct", async () => {
      const res = await requestWithSupertest
        .patch(`/categories/${createdCategory.id}`)
        .set("Accept", "application/json")
        .send({ name: "cancel weekly shopping" });

      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.message).toBe("success");
    });
  });
});

describe("POST /categories", () => {
  it("responds with a 201 status code and the generated category object", async () => {
    const res = await createRandomCategory();

    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("slug");
    expect(res.body).toHaveProperty("name");

    await requestWithSupertest.delete(`/categories/${res.body.id}`);
  });
  it("responds with a 400 status code and an array of validation issues if the request is incorrect", async () => {
    const res = await requestWithSupertest
      .post("/categories")
      .set("Accept", "application/json")
      .send({ slug: "random" });

    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.message).toBe("Invalid request");
    expect(res.body.issues.length).toBeGreaterThan(0);
  });
});

describe("DELETE /categories/:slug", () => {
  beforeAll(async () => {
    const res = await createRandomCategory();
    createdCategory = res.body;
  });

  it("responds with a 200 status code and a success message", async () => {
    const res = await requestWithSupertest.delete(
      `/categories/${createdCategory.id}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("success");
  });
});
