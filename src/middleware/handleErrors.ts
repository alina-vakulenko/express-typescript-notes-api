import { Request, Response, NextFunction } from "express";
import { AppError } from "helpers/appError.utils";
import { ValidationError } from "helpers/validationError.utils";
import errorHandler from "services/errorHandlerService";

const handleErrors = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    errorHandler.handleValidationError(err, res);
  } else {
    errorHandler.handleError(err, res);
  }
};

export default handleErrors;
