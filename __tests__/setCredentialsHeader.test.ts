import supertest from "supertest";
import express from "express";
import allowedOrigins from "@config/allowedOrigins";
import setCredentialsHeader from "@middleware/credentialsHeaderHandler";

const app = express();
app.use(setCredentialsHeader);

describe("setCredentialsHeader middleware", () => {
  it("should set Access-Control-Allow-Credentials header when the origin is allowed", async () => {
    const origin = allowedOrigins[0];
    const res = await supertest(app).get("/notes").set("Origin", origin);

    expect(res.headers).toHaveProperty(
      "access-control-allow-credentials",
      "true"
    );
  });

  it("should not set Access-Control-Allow-Credentials header when the origin is not allowed", async () => {
    const origin = "https://disallowed-origin.com";
    const res = await supertest(app).get("/notes").set("Origin", origin);

    expect(res.headers).not.toHaveProperty("access-control-allow-credentials");
  });
});
