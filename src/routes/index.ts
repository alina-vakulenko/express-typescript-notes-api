import express from "express";
import notesRouter from "./notesRouter";
import categoriesRouter from "./categoriesRouter";

const appRouter = express.Router();

appRouter.use("/notes", notesRouter);
appRouter.use("/categories", categoriesRouter);

export default appRouter;
