import { HttpCode } from "./httpStatusCodes.utils";

export interface AppErrorArgs {
  name?: string;
  httpCode: HttpCode;
  message?: string;
  isOperational?: boolean;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    if (args.message) {
      super(args.message);
    } else {
      super("An error occurred!");
    }

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = args.name || "Error";
    this.httpCode = args.httpCode;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}
