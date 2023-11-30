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
    return newCategory;
  }

  async getAllCategories(): Promise<{ count: number; categories: Category[] }> {
    const categoriesList = await categoryRepository.findAll();
    return { count: categoriesList.length, categories: categoriesList };
  }

  async updateCategory(
    slug: string,
    req: UpdateCategoryReq
  ): Promise<Category> {
    const updatedCategory = await categoryRepository.updateOne(slug, req);

    if (!updatedCategory) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Category ${slug} was not found or not updated`,
      });
    }

    return updatedCategory;
  }

  async deleteCategory(slug: string): Promise<{ message: string }> {
    const success = await categoryRepository.deleteOne(slug);

    if (!success) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Category ${slug} was not found`,
      });
    }

    return { message: "success" };
  }
}

const categoryService = new CategoryService();

export default categoryService;
