import pino, { Logger } from "pino";
import dayjs from "dayjs";

export const logger: Logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: dayjs().format(),
      ignore: "pid,hostname",
    },
  },
});
