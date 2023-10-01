import { Request } from "express";
import { AnyZodObject } from "zod";
import { HttpCode } from "@helpers/httpStatusCodes.utils";
import { ValidationError } from "@helpers/validationError.utils";
import {
  ParamsWithSlugSchema,
  CreateCategorySchema,
  UpdateCategorySchema,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@schemas/categories.schema";
import {
  ParamsWithNoteIdSchema,
  CreateNoteSchema,
  UpdateNoteSchema,
  NoteId,
  CreateNoteInput,
  UpdateNoteInput,
} from "@schemas/notes.schema";

type Schema = AnyZodObject;

type ValidationResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: ValidationError };

class ValidationService<TParams, TBodyCreate, TBodyUpdate> {
  private paramSchema: AnyZodObject;
  private createSchema: AnyZodObject;
  private updateSchema: AnyZodObject;

  constructor(
    paramSchema: AnyZodObject,
    createSchema: AnyZodObject,
    updateSchema: AnyZodObject
  ) {
    this.paramSchema = paramSchema;
    this.createSchema = createSchema;
    this.updateSchema = updateSchema;
  }

  private validate<T>(value: unknown, schema: Schema): ValidationResult<T> {
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
  }
  validateCreateRequest(req: Request) {
    const body = this.validate<TBodyCreate>(req.body, this.createSchema);
    return [null, body] as const;
  }
  validateUpdateRequest(req: Request) {
    const params = this.validate<TParams>(req.params, this.paramSchema);
    const body = this.validate<TBodyUpdate>(req.body, this.updateSchema);
    return [params, body] as const;
  }
  validateDeleteRequest(req: Request) {
    const params = this.validate<TParams>(req.params, this.paramSchema);
    console.log(params);
    return [params, null] as const;
  }
  validateGetOneRequest(req: Request) {
    const params = this.validate<TParams>(req.params, this.paramSchema);
    return [params, null] as const;
  }
}

export const noteValidationService = new ValidationService<
  { id: NoteId },
  CreateNoteInput,
  UpdateNoteInput
>(ParamsWithNoteIdSchema, CreateNoteSchema, UpdateNoteSchema);

export const categoryValidationService = new ValidationService<
  { slug: string },
  CreateCategoryInput,
  UpdateCategoryInput
>(ParamsWithSlugSchema, CreateCategorySchema, UpdateCategorySchema);
