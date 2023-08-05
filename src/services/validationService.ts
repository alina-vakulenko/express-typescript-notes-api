import { Schema, ValidationResult } from "./types";
import { HttpCode } from "helpers/httpStatusCodes.utils";
import { ValidationError } from "helpers/validationError.utils";

export const validate = <T>(
  value: any,
  schema: Schema
): ValidationResult<T> => {
  const parsed = schema.strict().safeParse(value);

  if (parsed.success) {
    return { status: "success", data: parsed.data as T };
  } else {
    const issues = parsed.error.issues.map((issue) =>
      issue.path.length > 0
        ? { field: String(issue.path[0]), message: issue.message }
        : { message: issue.message }
    );
    const validationError = new ValidationError({
      name: "Validation Error",
      httpCode: HttpCode.BAD_REQUEST,
      message: "Invalid request",
      issues: issues,
    });

    return { status: "error", error: validationError };
  }
};
