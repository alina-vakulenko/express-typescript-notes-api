import express, { Express } from "express";

import cors from "cors";
import corsOptions from "config/corsOptions";
import errorHandler from "middleware/handleErrors";
import appRouter from "routes";

export const createServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());

  appRouter(app);

  app.use(errorHandler);

  return app;
};

export const startServer = (
  app: Express,
  port: number,
  onSuccess: () => void
): void => {
  app.listen(port, () => {
    onSuccess();
  });
};
