import Note from "@db/models/note.model";
import { Category } from "@schemas/category.schema";
import { CategoryDto } from "dto";

export class NoteResDTO {
  id: string;
  name: string;
  categoryId: number | null;
  createdAt: Date;
  content: string;
  archived: boolean;
  category?: Category;

  constructor(data: Note) {
    this.id = data.id;
    this.name = data.name;
    this.categoryId = data.categoryId;
    this.createdAt = data.createdAt;
    this.content = data.content;
    this.archived = data.archived;
    this.category = data.category
      ? new CategoryDto.CategoryResDTO(data.category)
      : undefined;
  }
}
