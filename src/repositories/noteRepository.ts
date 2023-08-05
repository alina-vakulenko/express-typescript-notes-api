import path from "path";
import { Note } from "schemas/notes.schema";
import { NoteDb } from "data/noteDB";
import { createNoteDb, prepopulateDB } from "data/noteDB";
import { createTestDb } from "data/noteDB_TEST";

class NoteRepository {
  private noteDb: NoteDb;

  constructor(noteDb: NoteDb) {
    this.noteDb = noteDb;
  }

  public async create(data: Note) {
    this.noteDb.save([...this.noteDb.notes, data]);
  }

  public async findAll() {
    return Promise.resolve(this.noteDb.notes);
  }

  public async findById(id: string) {
    return Promise.resolve(this.noteDb.notes.find((note) => note.id === id));
  }

  public async deleteOne(id: string) {
    const filteredNotes = this.noteDb.notes.filter((note) => note.id !== id);
    this.noteDb.save(filteredNotes);
  }

  public async updateOne(id: string, data: Partial<Note>) {
    const updatedNotes = this.noteDb.notes.map((note) => {
      if (note.id !== id) {
        return note;
      } else {
        return { ...note, ...data };
      }
    });
    this.noteDb.save(updatedNotes);
  }
}

const createDB = () => {
  if (process.env.NODE_ENV === "test") {
    return createTestDb();
  } else {
    const pathToStorage = path.join(__dirname, "..", "data", "data.json");
    const noteDb = createNoteDb(pathToStorage);
    prepopulateDB(noteDb, pathToStorage);
    return noteDb;
  }
};

export const db = createDB();
const noteRepository = new NoteRepository(db);

export default noteRepository;
