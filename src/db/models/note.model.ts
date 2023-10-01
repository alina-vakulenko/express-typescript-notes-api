import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  UUIDV4,
  NonAttribute,
  Association,
  ForeignKey,
} from "sequelize";
import { modelConfig } from "./modelConfig";
import { parseDates } from "@helpers/parseDates.utils";
import Category from "./category.model";

class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare content: string;
  declare dates: CreationOptional<Date[]>;
  declare archived: CreationOptional<boolean>;
  declare categoryId: ForeignKey<Category["id"]>;
  declare category?: NonAttribute<Category>; //an eagerly-loaded association

  declare getCategory: BelongsToGetAssociationMixin<Category>;
  declare createCategory: BelongsToCreateAssociationMixin<Category>;

  declare readonly createdAt: CreationOptional<Date>;

  declare static associations: {
    projects: Association<Note, Category>;
  };
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    dates: {
      type: DataTypes.VIRTUAL,
      get() {
        return parseDates(this.content);
      },
      set() {
        throw new Error("Do not try to set the `dates` value!");
      },
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: DataTypes.DATE,
  },
  {
    ...modelConfig,
    modelName: "note",
  }
);

Category.hasMany(Note);
Note.belongsTo(Category);

export default Note;
