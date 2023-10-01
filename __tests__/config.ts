import request from "supertest";
import app from "../src/app";

export const requestWithSupertest = request(app);
