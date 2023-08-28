import { Sequelize, Dialect } from "sequelize";
import config from "./config";

const dbName = config.database as string;
const dbUser = config.username as string;
const dbHost = config.host;
const dbDriver = config.dialect as Dialect;
const dbPassword = config.password;

const dbConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});

export default dbConnection;
