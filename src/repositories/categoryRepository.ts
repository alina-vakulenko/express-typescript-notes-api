import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@schemas/categories.schema";
import CategoryModel from "@db/models/category.model";
import slugify from "@helpers/slugify.utils";

class CategoryRepository {
  public async create(data: CreateCategoryInput): Promise<Category> {
    const slug = slugify(data.name);
    return await CategoryModel.create({ ...data, slug });
  }

  public async findAll(): Promise<Category[]> {
    return await CategoryModel.findAll({ attributes: ["name", "slug"] });
  }

  public async findOneBySlug(slug: string): Promise<Category | null> {
    return await CategoryModel.findOne({ where: { slug } });
  }

  public async deleteOne(slug: string): Promise<void> {
    const res = await CategoryModel.destroy({
      where: {
        slug,
      },
    });
    console.log("delete", res);
  }

  public async updateOne(
    slug: string,
    data: UpdateCategoryInput
  ): Promise<void> {
    await CategoryModel.update(data, { where: { slug } });
  }
}

const categoryRepository = new CategoryRepository();

export default categoryRepository;
