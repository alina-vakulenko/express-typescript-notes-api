import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  UUIDV4,
} from "sequelize";
import dbConnection from "@db/connection";

class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare readonly createdAt: CreationOptional<Date>;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
  },
  {
    timestamps: true,
    updatedAt: false,
    sequelize: dbConnection,
    modelName: "Category",
  }
);

export default Category;
