import dbConnection from "@db/connection";

export const modelConfig = {
  underscored: true,
  updatedAt: false,
  sequelize: dbConnection,
};
