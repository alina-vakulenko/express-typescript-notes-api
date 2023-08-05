import express from "express";
import notesRouter from "./notesRouter";

const appRouter = express.Router();

appRouter.use("/notes", notesRouter);

export default appRouter;
