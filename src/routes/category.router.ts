import express from "express";
import * as CategoriesController from "@controllers/categoriesController";

const categoriesRouter = express.Router();

categoriesRouter
  .route("/")
  .get(CategoriesController.getCategories)
  .post(CategoriesController.createCategory);

categoriesRouter
  .route("/:slug")
  .patch(CategoriesController.updateCategory)
  .delete(CategoriesController.deleteCategory);

export default categoriesRouter;
