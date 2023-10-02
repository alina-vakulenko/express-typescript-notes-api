import type {
  NoteId,
  CreateNoteInput,
  UpdateNoteInput,
} from "@schemas/notes.schema";
import NoteModel from "@db/models/note.model";
import CategoryModel from "@db/models/category.model";

class NoteRepository {
  public async create(data: CreateNoteInput): Promise<NoteModel> {
    return await NoteModel.create(data);
  }

  public async findAll(): Promise<NoteModel[]> {
    return await NoteModel.findAll({
      attributes: { exclude: ["categoryId"] },
      include: {
        model: CategoryModel,
        attributes: ["slug", "name"],
      },
    });
  }

  public async findById(id: NoteId): Promise<NoteModel | null> {
    return await NoteModel.findByPk(id, {
      attributes: { exclude: ["categoryId"] },
      include: { model: CategoryModel, attributes: ["slug", "name"] },
    });
  }

  public async deleteOne(id: NoteId): Promise<void> {
    await NoteModel.destroy({
      where: {
        id,
      },
    });
  }

  public async updateOne(id: NoteId, data: UpdateNoteInput): Promise<void> {
    await NoteModel.update(data, { where: { id } });
  }
}

const noteRepository = new NoteRepository();

export default noteRepository;
