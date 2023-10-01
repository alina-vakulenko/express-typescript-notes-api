import type {
  Note,
  CreateNoteInput,
  UpdateNoteInput,
} from "@schemas/notes.schema";
import NoteModel from "@db/models/note.model";
import CategoryModel from "@db/models/category.model";

class NoteRepository {
  public async create(data: CreateNoteInput): Promise<Note> {
    const newNote = await NoteModel.create(data);
    const category = await newNote.getCategory();
    console.log(category);
    return newNote;
  }

  public async findAll(): Promise<Note[]> {
    return await NoteModel.findAll({
      attributes: { exclude: ["categoryId"] },
      include: {
        model: CategoryModel,
        attributes: ["slug", "name"],
      },
    });
  }

  public async findById(id: string): Promise<Note | null> {
    return await NoteModel.findByPk(id, {
      attributes: { exclude: ["categoryId"] },
      include: { model: CategoryModel, attributes: ["slug", "name"] },
    });
  }

  public async deleteOne(id: string): Promise<void> {
    await NoteModel.destroy({
      where: {
        id: id,
      },
    });
  }

  public async updateOne(id: string, data: UpdateNoteInput): Promise<void> {
    await NoteModel.update(data, { where: { id: id } });
  }
}

const noteRepository = new NoteRepository();

export default noteRepository;
