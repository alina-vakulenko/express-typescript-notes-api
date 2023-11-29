import NoteModel from "@db/models/note.model";
import CategoryModel from "@db/models/category.model";
import {
  CreateNoteReq,
  Note,
  NoteId,
  UpdateNoteReq,
} from "@schemas/note.schema";
import { NoteDto } from "dto";

class NoteRepository {
  public async create(req: CreateNoteReq): Promise<Note> {
    const data = await NoteModel.create(req);
    return new NoteDto.NoteResDTO(data);
  }

  public async findAll(): Promise<Note[]> {
    const dataArray = await NoteModel.findAll({
      attributes: { exclude: ["categoryId"] },
      include: {
        model: CategoryModel,
        attributes: ["slug", "name"],
      },
    });

    return dataArray.map((item) => new NoteDto.NoteResDTO(item));
  }

  public async findById(id: NoteId): Promise<Note | null> {
    const data = await NoteModel.findByPk(id, {
      attributes: { exclude: ["categoryId"] },
      include: { model: CategoryModel, attributes: ["slug", "name"] },
    });

    return data ? new NoteDto.NoteResDTO(data) : null;
  }

  public async deleteOne(id: NoteId): Promise<void> {
    const res = await NoteModel.destroy({
      where: {
        id,
      },
    });
    console.log("delete note response", res);
  }

  public async updateOne(id: NoteId, data: UpdateNoteReq): Promise<void> {
    const res = await NoteModel.update(data, { where: { id } });
    console.log("update note response", res);
  }
}

const noteRepository = new NoteRepository();

export default noteRepository;
