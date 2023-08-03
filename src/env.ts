import "dotenv/config";
import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  PORT: port(),
});

export default env;
