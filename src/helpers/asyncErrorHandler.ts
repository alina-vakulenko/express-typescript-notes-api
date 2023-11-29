import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError.utils";

export const asyncErrorHandler = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: AppError) => next(err));
  };
};
