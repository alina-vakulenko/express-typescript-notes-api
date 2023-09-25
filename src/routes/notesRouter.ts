import express from "express";
import * as RoutesHandler from "@services/routesHandlerService";

const router = express.Router();

router
  .route("/")
  .get(RoutesHandler.handleGetAllNotesRequest)
  .post(RoutesHandler.handleCreateNoteRequest);

router.route("/stats").get(RoutesHandler.handleGetStatsRequest);

router
  .route("/:id")
  .get(RoutesHandler.handleGetOneNoteRequest)
  .patch(RoutesHandler.handleUpdateNoteRequest)
  .delete(RoutesHandler.handleDeleteNoteRequest);

export default router;
