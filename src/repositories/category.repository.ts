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
    const dataArray = await CategoryModel.findAll({
      attributes: ["name", "slug"],
    });
    return dataArray.map((item) => new CategoryDto.CategoryResDTO(item));
  }

  public async findOne(slug: string): Promise<Category | null> {
    const data = await CategoryModel.findOne({ where: { slug } });
    return data ? new CategoryDto.CategoryResDTO(data) : null;
  }

  public async deleteOne(slug: string): Promise<void> {
    const res = await CategoryModel.destroy({
      where: {
        slug,
      },
    });
    console.log("delete category result", res);
  }

  public async updateOne(slug: string, body: UpdateCategoryReq): Promise<void> {
    const data = await CategoryModel.update(body, { where: { slug } });
    console.log("update category result", data);
  }
}

const categoryRepository = new CategoryRepository();

export default categoryRepository;
