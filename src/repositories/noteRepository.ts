import type {
  Note,
  NoteCreateInput,
  NoteUpdateInput,
} from "@schemas/notes.schema";
import NoteModel from "@db/models/note.model";

class NoteRepository {
  public async create(data: NoteCreateInput): Promise<Note> {
    return await NoteModel.create(data);
  }

  public async findAll(): Promise<Note[]> {
    return await NoteModel.findAll();
  }

  public async findById(id: string): Promise<Note | null> {
    return await NoteModel.findByPk(id);
  }

  public async deleteOne(id: string): Promise<void> {
    await NoteModel.destroy({
      where: {
        id: id,
      },
    });
  }

  public async updateOne(id: string, data: NoteUpdateInput): Promise<void> {
    await NoteModel.update(data, { where: { id: id } });
  }
}

const noteRepository = new NoteRepository();

export default noteRepository;
