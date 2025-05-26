import { ZodError } from 'zod';

import { ErrorBase } from './ErrorBase';

type ValidationErrorType = Map<string, string[]>;

export class ValidationError extends ErrorBase<ValidationErrorType> {
  constructor(error: ZodError) {
    const { fieldErrors } = error.flatten();
    const errors: ValidationErrorType = new Map();

    Object.entries(fieldErrors).forEach(([key, value]) => {
      if (value && value.length > 0) {
        errors.set(key, value);
      }
    });

    super('Validation error', 422, errors);
  }

  public toResponse() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: Object.fromEntries(this.errors ?? []),
    };
  }
}
