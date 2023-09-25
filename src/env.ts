import "dotenv/config";
import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  DB_DRIVER: str(),
  PORT: port(),
  POSTGRES_DB: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_USER: str(),
  POSTGRES_HOST: str(),
  POSTGRES_PORT: port(),
});

export default env;
