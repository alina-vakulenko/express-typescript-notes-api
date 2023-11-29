import categoryRepository from "@repositories/category.repository";
import { AppError } from "@helpers/appError.utils";
import { HttpCode } from "@helpers/httpStatusCodes.utils";
import type {
  Category,
  CreateCategoryReq,
  UpdateCategoryReq,
} from "@schemas/category.schema";

class CategoryService {
  async createCategory(req: CreateCategoryReq): Promise<Category> {
    const newCategory = await categoryRepository.create(req);
    console.log("create category service", newCategory);
    return newCategory;
  }

  async getAllCategories(): Promise<Category[]> {
    const categoriesList = await categoryRepository.findAll();

    if (categoriesList.length === 0) {
      throw new AppError({
        httpCode: HttpCode.NO_CONTENT,
        message: "Categories list is empty",
      });
    }

    return categoriesList;
  }

  async updateCategory(slug: string, req: UpdateCategoryReq): Promise<void> {
    const category = await categoryRepository.findOne(slug);

    if (!category) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Category ${slug} was not found`,
      });
    }

    await categoryRepository.updateOne(slug, req);
  }

  async deleteCategory(slug: string): Promise<void> {
    const category = await categoryRepository.findOne(slug);

    if (!category) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Category ${slug} was not found`,
      });
    }

    await categoryRepository.deleteOne(slug);
  }
}

const categoryService = new CategoryService();

export default categoryService;
