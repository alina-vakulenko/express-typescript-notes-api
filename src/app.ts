import envVariables from "env";
import { createServer, startServer } from "helpers/server.utils";
import ErrorHandler from "helpers/errorHandler";
import { logger } from "helpers/logger.utils";

const app = createServer();

export const errorHandler = new ErrorHandler(logger);

const port = envVariables.PORT;
const onServerStartSuccess = () => {
  logger.info(
    `${envVariables.NODE_ENV.toUpperCase()} server is running on port ${port}`
  );
};
startServer(app, port, onServerStartSuccess);

process.on("unhandledRejection", (reason: Error) => {
  throw reason;
});

process.on("uncaughtException", (error: Error) => {
  errorHandler.handleError(error);
});
