import pino from "pino";
import dayjs from "dayjs";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: dayjs().format(),
      ignore: "pid,hostname",
    },
  },
});
