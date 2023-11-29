import { Options, Dialect } from "sequelize";
import env from "../env";

type Environment = "development" | "test" | "production";

type Config = Record<Environment, Options>;

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

const currentEnv: Environment = (env.NODE_ENV as Environment) || "development";

export default dbConfig[currentEnv];
module.exports = dbConfig[currentEnv];
