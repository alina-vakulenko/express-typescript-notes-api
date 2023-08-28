import env from "@env";
import dbConnection from "@db/connection";
import { logger } from "@helpers/logger.utils";
import errorHandler from "@services/errorHandlerService";
import app from "./app";

const startServer = async () => {
  try {
    await dbConnection.authenticate();
    logger.info("DB connection has been established successfully");

    const port = env.PORT;
    app.listen(port, () => {
      logger.info(
        `${env.NODE_ENV.toUpperCase()} server is running on port ${port}`
      );
    });
  } catch (error) {
    errorHandler.handleError(error as Error);
  }
};

startServer();

process.on("unhandledRejection", (reason: Error) => {
  throw reason;
});

process.on("uncaughtException", (error: Error) => {
  errorHandler.handleError(error);
});
