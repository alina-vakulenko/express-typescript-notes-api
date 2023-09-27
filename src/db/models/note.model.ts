import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  UUIDV4,
} from "sequelize";
import dbConnection from "@db/connection";
import { parseDates } from "@helpers/parseDates.utils";
import Category from "./category.model";

class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare content: string;
  declare dates: CreationOptional<Date[]>;
  declare archived: CreationOptional<boolean>;
  declare categoryId: CreationOptional<number>;
  declare readonly category?: Pick<Category, "name">;
  declare readonly createdAt: CreationOptional<Date>;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    categoryId: DataTypes.INTEGER,
    name: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    dates: {
      type: DataTypes.VIRTUAL,
      get() {
        return parseDates(this.content);
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
    underscored: true,
    updatedAt: false,
    sequelize: dbConnection,
    modelName: "note",
  }
);

Category.hasMany(Note, {
  sourceKey: "id",
  foreignKey: {
    name: "categoryId",
    allowNull: false,
    defaultValue: 1,
  },
  onDelete: "SET DEFAULT",
  onUpdate: "CASCADE",
});
Note.belongsTo(Category);

export default Note;
