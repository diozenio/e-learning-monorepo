import { ZodError } from "zod";

import { AppError } from "./AppError";

export class ValidationError extends AppError {
  constructor(error: ZodError) {
    const errors = error.errors.map((err) => err.message);
    super("Validation error", 422, errors);
  }
}
