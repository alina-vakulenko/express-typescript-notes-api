import { Request, Response, NextFunction } from "express";
import { HttpCode } from "@helpers/httpStatusCodes.utils";
import { AppError } from "@helpers/appError.utils";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError({
    httpCode: HttpCode.NOT_FOUND,
    message: `Not Found: ${req.originalUrl}`,
  });

  next(error);
};

export default notFoundHandler;
