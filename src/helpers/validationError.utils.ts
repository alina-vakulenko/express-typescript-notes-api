import { AppError } from "./appError.utils";
import { AppErrorArgs } from "./appError.utils";

type ValidationIssue = {
  field?: string;
  message: string;
};

export interface ValidationErrorArgs extends AppErrorArgs {
  issues: ValidationIssue[];
}

export class ValidationError extends AppError {
  public readonly issues: ValidationIssue[];

  constructor(args: ValidationErrorArgs) {
    const { issues, ...rest } = args;
    super(rest);

    this.issues = issues;
  }
}
