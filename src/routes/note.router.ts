import express from "express";
import * as notesController from "@controllers/notesController";

const notesRouter = express.Router();

notesRouter
  .route("/")
  .get(notesController.getNotes)
  .post(notesController.createNote);

notesRouter.route("/stats").get(notesController.getNotesStats);

notesRouter
  .route("/:id")
  .get(notesController.getNoteById)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

export default notesRouter;
