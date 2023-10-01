import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import { modelConfig } from "./modelConfig";
import Note from "./note.model";

class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug: CreationOptional<string>;
  declare readonly createdAt: CreationOptional<Date>;

  declare getNotes: HasManyGetAssociationsMixin<Note>;
  declare setNotes: HasManySetAssociationsMixin<Note, Note["id"]>;
  declare removeNote: HasManyRemoveAssociationMixin<Note, Note["id"]>;
  declare removeNotes: HasManyRemoveAssociationsMixin<Note, Note["id"]>;
  declare hasNote: HasManyHasAssociationMixin<Note, Note["id"]>;
  declare hasNotes: HasManyHasAssociationsMixin<Note, Note["id"]>;
  declare countNotes: HasManyCountAssociationsMixin;
  declare createNote: HasManyCreateAssociationMixin<Note, "categoryId">;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
  },
  {
    ...modelConfig,
    modelName: "category",
  }
);

export default Category;
