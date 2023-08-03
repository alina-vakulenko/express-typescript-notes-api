import { Request, Response, NextFunction } from "express";
import AppError from "helpers/appError.utils";
import { errorHandler } from "app";

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorHandler.handleError(err, res);
};
