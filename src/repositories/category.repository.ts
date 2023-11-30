import CategoryModel from "@db/models/category.model";
import slugify from "@helpers/slugify.utils";
import {
  Category,
  CreateCategoryReq,
  UpdateCategoryReq,
} from "@schemas/category.schema";
import { CategoryDto } from "dto";

class CategoryRepository {
  public async create(req: CreateCategoryReq): Promise<Category> {
    const slug = slugify(req.name);
    const data = await CategoryModel.create({ ...req, slug });
    return new CategoryDto.CategoryResDTO(data);
  }

  public async findAll(): Promise<Category[]> {
    const dataArray = await CategoryModel.findAll();
    return dataArray.map((item) => new CategoryDto.CategoryResDTO(item));
  }

  public async deleteOne(slug: string): Promise<boolean> {
    const responseCode = await CategoryModel.destroy({
      where: {
        slug,
      },
    });

    return responseCode === 1;
  }

  public async updateOne(
    slug: string,
    data: UpdateCategoryReq
  ): Promise<Category | null> {
    const updatedSlug = slugify(data.name);
    const [updatedRowsCount, updatedCategories] = await CategoryModel.update(
      { ...data, slug: updatedSlug },
      {
        where: { slug },
        returning: true,
      }
    );

    return updatedRowsCount > 0
      ? new CategoryDto.CategoryResDTO(updatedCategories[0])
      : null;
  }
}

const categoryRepository = new CategoryRepository();

export default categoryRepository;
