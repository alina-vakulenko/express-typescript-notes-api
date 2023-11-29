// import { Request, Response, NextFunction } from "express";
// import { HttpCode } from "@helpers/httpStatusCodes.utils";
// import { ValidationError } from "@helpers/validationError.utils";
// import validationService from "@services/validationService";
// import { Note } from "@schemas/note.schema";

// const handleValidationErrors = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { params, body } = req;
//   const validatedParams = validationService.validate(params, );
//   const validatedBody = noteValidationService.validateCreateBody(body);

//   if (validatedBody.status === "error") {
//     next(validatedBody.errors);
//     return;
//   }
//   if (validatedParams.status === "error") {
//     next(validatedParams.errors);
//     return;
//   }

//   next();
// };
