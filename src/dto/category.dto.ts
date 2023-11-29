import Category from "@db/models/category.model";

export class CategoryResDTO {
  id: number;
  slug: string;
  name: string;
  createdAt: Date;

  constructor(data: Category) {
    this.id = data.id;
    this.slug = data.slug;
    this.name = data.name;
    this.createdAt = data.createdAt;
  }
}
