import request from "supertest";
import app from "../src/app";

describe("app", () => {
  it("responds with a 'Not found' message if request is not recognized", (done) => {
    request(app)
      .get("/not-valid")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done);
  });
});
