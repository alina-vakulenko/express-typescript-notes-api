import { requestWithSupertest } from "./config";

describe("app", () => {
  it("responds with a 'Not found' message if request is not recognized", (done) => {
    requestWithSupertest
      .get("/not-valid")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done);
  });
});
