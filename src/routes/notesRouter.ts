import express from "express";
import notesService from "services/noteService";

const router = express.Router();

router.route("/").get(notesService.getAllNotes).post(notesService.createNote);

router.route("/stats").get(notesService.getStats);

router
  .route("/:id")
  .get(notesService.getNoteById)
  .patch(notesService.updateNote)
  .delete(notesService.deleteNote);

export default router;
