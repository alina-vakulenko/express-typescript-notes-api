import envVariables from "env";
import { logger } from "helpers/logger.utils";
import errorHandler from "services/errorHandlerService";
import app from "./app";

const port = envVariables.PORT;
app.listen(port, () => {
  logger.info(
    `${envVariables.NODE_ENV.toUpperCase()} server is running on port ${port}`
  );
});

process.on("unhandledRejection", (reason: Error) => {
  throw reason;
});

process.on("uncaughtException", (error: Error) => {
  errorHandler.handleError(error);
});
