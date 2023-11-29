import express from "express";
import notesRouter from "./note.router";
import categoriesRouter from "./category.router";

const appRouter = express.Router();

appRouter.use("/notes", notesRouter);
appRouter.use("/categories", categoriesRouter);

export default appRouter;
