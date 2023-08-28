import { Options, Dialect } from "sequelize";
import env from "@env";

interface Config {
  development: Options;
  test: Options;
  production: Options;
}

const dbConfig: Config = {
  development: {
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    dialect: env.DB_DRIVER as Dialect,
  },
  test: {
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    dialect: env.DB_DRIVER as Dialect,
  },
  production: {
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    dialect: env.DB_DRIVER as Dialect,
  },
};

const currentEnv = (env.NODE_ENV as keyof Config) || "development";

export default dbConfig[currentEnv];
module.exports = dbConfig[currentEnv];
