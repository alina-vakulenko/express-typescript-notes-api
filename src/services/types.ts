import { AnyZodObject } from "zod";
import { ValidationError } from "helpers/validationError.utils";

export type Schema = AnyZodObject;

export type ValidationResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: ValidationError };

export type Stats = {
  [category: string]: Record<"active" | "archived", number>;
};
