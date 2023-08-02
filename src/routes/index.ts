import { Express } from "express";

import notesRouter from "./notesRouter";

const appRouter = (app: Express) => {
  app.use("/notes", notesRouter);

  app.all("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default appRouter;
