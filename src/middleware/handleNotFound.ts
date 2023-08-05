import { Request, Response, NextFunction } from "express";
import { HttpCode } from "helpers/httpStatusCodes.utils";
import { AppError } from "helpers/appError.utils";

const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);

  const error = new AppError({
    httpCode: HttpCode.NOT_FOUND,
    message: `Not Found: ${req.originalUrl}`,
  });

  next(error);
};

export default handleNotFound;
