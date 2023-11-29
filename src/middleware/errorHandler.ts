import { Request, Response, NextFunction } from "express";
import { AppError } from "@helpers/appError.utils";
import { ValidationError } from "@helpers/validationError.utils";
import errorHandlerService from "@services/errorHandlingService";

// const devError = (res, err) => {
//   res.status(err.httpCode).json({
//     status: err.httpStatus,
//     message: err.message,
//     stackTrace: err.stack,
//   });
// };
// const propdError = (res, err) => {
// if (errorHandler.isOperational){
// res.status(err.httpCode).json({
//     status: err.httpStatus,
//     message: err.message,
//   });
// } else {
// res.status(500).json({message: "Something went wrong"})
// }
//
// };

// if(process.env.NODE_ENV==="development"){
//   devError()
// }else if (process.env.NODE_ENV === "production"){
//   prodError()
// }
const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    // err.statusCode = err.statusCode || 500
    // err/status = err.status || "error"
    // res.status(err.statusCode).json({status: error.status, message: err.message})
    errorHandlerService.handleValidationError(err, res);
  } else {
    errorHandlerService.handleError(err, res);
  }
};

export default errorHandler;
