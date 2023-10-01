import categoryRepository from "@repositories/categoryRepository";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  Category,
} from "@schemas/categories.schema";
import { AppError } from "@helpers/appError.utils";
import { HttpCode } from "@helpers/httpStatusCodes.utils";

class CategoryService {
  async createCategory(input: CreateCategoryInput): Promise<Category> {
    const newCategory = await categoryRepository.create(input);
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

  async updateCategory(
    slug: string,
    input: UpdateCategoryInput
  ): Promise<void> {
    const category = await categoryRepository.findOneBySlug(slug);

    if (!category) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Category ${slug} was not found`,
      });
    }

    await categoryRepository.updateOne(slug, input);
  }

  async deleteCategory(slug: string): Promise<void> {
    const category = await categoryRepository.findOneBySlug(slug);

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
