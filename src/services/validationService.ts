import { AnyZodObject } from "zod";

type Schema = AnyZodObject;
type ValidationError = {
  field?: string;
  message: string;
};

type ValidationResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; errors: ValidationError[] };

class ValidationService {
  constructor() {}

  validate<T>(value: unknown, schema: Schema): ValidationResult<T> {
    const parsed = schema.strict().safeParse(value);

    if (parsed.success) {
      return { status: "success", data: parsed.data as T };
    }
    const issues = parsed.error.issues.map((issue) =>
      issue.path.length > 0
        ? { field: String(issue.path[0]), message: issue.message }
        : { message: issue.message }
    );

    return { status: "error", errors: issues };
  }
}

const validationService = new ValidationService();

export default validationService;
