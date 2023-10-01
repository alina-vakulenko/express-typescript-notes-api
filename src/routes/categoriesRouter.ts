import express from "express";
import * as RoutesHandler from "@services/routesHandlerService";

const router = express.Router();

router
  .route("/")
  .get(RoutesHandler.handleGetAllCategoriesRequest)
  .post(RoutesHandler.handleCreateCategoryRequest);

router
  .route("/:slug")
  .patch(RoutesHandler.handleUpdateCategoryRequest)
  .delete(RoutesHandler.handleDeleteCategoryRequest);

export default router;
