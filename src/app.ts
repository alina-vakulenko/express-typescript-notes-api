import express from "express";
import cors from "cors";
import corsOptions from "@config/corsOptions";
import {
  errorHandler,
  notFoundHandler,
  credentialsHeaderHandler,
} from "@middleware/index";
import appRouter from "@routes/index";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(credentialsHeaderHandler);

app.use("/api/v1", appRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
