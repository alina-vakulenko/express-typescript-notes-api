import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  UUIDV4,
} from "sequelize";
import dbConnection from "@db/connection";

class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare content: string;
  declare category_id: number;
  declare dates: CreationOptional<Date[]>;
  declare archived: CreationOptional<boolean>;
  declare readonly createdAt: Date;
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Category",
        key: "id",
      },
    },
    content: { type: DataTypes.TEXT, allowNull: false },
    dates: { type: DataTypes.ARRAY(DataTypes.DATE) },
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
