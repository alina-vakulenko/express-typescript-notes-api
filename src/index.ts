import env from "@env";
import dbConnection from "@db/connection";
import { logger } from "@helpers/logger.utils";
import errorHandlerService from "@services/errorHandlingService";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception occured! Shutting down...");
  process.exit(1);
});

import app from "./app";

dbConnection.authenticate().then(() => {
  logger.info("DB connection has been established successfully");
});

const port = env.PORT;
const server = app.listen(port, () => {
  logger.info(
    `${env.NODE_ENV.toUpperCase()} server is running on port ${port}`
  );
});

process.on("unhandledRejection", (error: Error) => {
  console.log("Unhandled rejection occured! Shutting down...");
  console.log("error name", error.name);
  console.log("cause", error.cause);
  console.log("message", error.message);
  server.close(() => {
    process.exit(1);
  });
});
