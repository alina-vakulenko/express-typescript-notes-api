import express from "express";
import cors from "cors";
import corsOptions from "@config/corsOptions";
import setCredentialsHeader from "@middleware/setCredentialsHeader";
import handleNotFound from "@middleware/handleNotFound";
import handleErrors from "@middleware/handleErrors";
import appRouter from "@routes/index";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(setCredentialsHeader);

app.use("", appRouter);

app.use(handleNotFound);
app.use(handleErrors);

export default app;
