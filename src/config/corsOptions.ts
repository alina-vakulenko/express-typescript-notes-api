import allowedOrigins from "./allowedOrigins";

const corsOptions = {
  origin: allowedOrigins,
  // credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
