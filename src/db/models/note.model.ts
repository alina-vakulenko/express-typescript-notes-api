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

class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare content: string;
  declare category_id: number;
  declare dates: CreationOptional<Date[]>;
  declare archived: CreationOptional<boolean>;
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
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: "Category",
        key: "id",
      },
    },
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
    timestamps: true,
    updatedAt: false,
    sequelize: dbConnection,
    modelName: "Note",
  }
);

export default Note;
