import express, { Express } from "express";

import cors from "cors";
import corsOptions from "config/corsOptions";

import appRouter from "routes";

export const createServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());

  appRouter(app);

  return app;
};

export const startServer = (
  app: Express,
  port: number,
  onSuccess: () => void,
  onError: (error: unknown) => void
): void => {
  try {
    app.listen(port, () => {
      onSuccess();
    });
  } catch (error) {
    onError(error);
  }
};
