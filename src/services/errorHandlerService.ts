import { Response } from "express";
import { Logger } from "pino";
import { HttpCode } from "@helpers/httpStatusCodes.utils";
import { AppError } from "@helpers/appError.utils";
import { ValidationError } from "@helpers/validationError.utils";
import { logger } from "@helpers/logger.utils";

class ErrorHandler {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  private isTrustedError(err: Error): boolean {
    return err instanceof AppError && err.isOperational;
  }

  public handleValidationError(error: ValidationError, res: Response): void {
    res.status(error.httpCode).json({
      message: error.message,
      issues: error.issues,
    });
  }

  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private handleTrustedError(err: AppError, res: Response): void {
    res.status(err.httpCode).json({ message: err.message });
  }

  private handleCriticalError(err: Error | AppError, res?: Response): void {
    if (res) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }

    this.logger.error(err);
    process.exit(1);
  }
}

const errorHandler = new ErrorHandler(logger);

export default errorHandler;
