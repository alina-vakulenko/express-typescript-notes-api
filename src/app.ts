import envVariables from "env";
import { createServer, startServer } from "helpers/server.utils";
import { logger } from "helpers/logger.utils";

const port = envVariables.PORT;
const app = createServer();

const onServerStartSuccess = () => {
  logger.info(
    `${envVariables.NODE_ENV.toUpperCase()} server is running on port ${port}`
  );
};

const onServerStartError = (error: unknown) => {
  logger.error(`${error}`);
  process.exit(1);
};

startServer(app, port, onServerStartSuccess, onServerStartError);
