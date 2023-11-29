import { Category } from "@schemas/category.schema";
import { requestWithSupertest } from "./config";
import { createRandomCategory } from "./utils";

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

describe("A slug passed as a query parameter doesn't exist in a DB", () => {
  it("responds with a 404 status code on GET request", async () => {
    const res = await requestWithSupertest
      .get("/categories/notExistingSlug")
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(404);
  });
  it("responds with a 404 status code on PATCH request", async () => {
    const res = await requestWithSupertest
      .patch("/categories/notExistingSlug")
      .set("Accept", "application/json")
      .send({
        name: "category name",
      });

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(404);
  });
  it("responds with a 404 status code on DELETE request", async () => {
    const res = await requestWithSupertest
      .delete("/categories/notExistingSlug")
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(404);
  });
});

let createdCategory: Category;
describe("PATCH /categories/:slug", () => {
  beforeAll(async () => {
    const res = await createRandomCategory();
    createdCategory = res.body;
  });
  afterAll(async () => {
    await requestWithSupertest.delete(`/categories/${createdCategory.slug}`);
    createdCategory = {} as Category;
  });
  it("responds with a 400 status code and an array of validation issues if request is incorrect", async () => {
    const res = await requestWithSupertest
      .patch(`/categories/${createdCategory.slug}`)
      .set("Accept", "application/json")
      .send({ slug: "slug" });

    expect(res.statusCode).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.message).toBe("Invalid request");
    expect(res.body.issues.length).toBeGreaterThan(0);
  });
  it("responds with a 200 status code and a success message if request is correct", async () => {
    const res = await requestWithSupertest
      .patch(`/categories/${createdCategory.slug}`)
      .set("Accept", "application/json")
      .send({ name: "updated category" });

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.message).toBe("success");
  });
});

describe("POST /categories", () => {
  afterAll(async () => {
    await requestWithSupertest.delete(`/categories/${createdCategory.slug}`);
    createdCategory = {} as Category;
  });
  it("responds with a 201 status code and the generated category object", async () => {
    const res = await createRandomCategory();
    createdCategory = res.body;

    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("slug");
    expect(res.body).toHaveProperty("name");
  });
  it("responds with a 400 status code and an array of validation issues if the request is incorrect", async () => {
    const res = await requestWithSupertest
      .post("/categories")
      .set("Accept", "application/json")
      .send({});

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
  afterAll(() => {
    createdCategory = {} as Category;
  });

  it("responds with a 200 status code and a success message", async () => {
    const res = await requestWithSupertest.delete(
      `/categories/${createdCategory.slug}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("success");
  });
});
