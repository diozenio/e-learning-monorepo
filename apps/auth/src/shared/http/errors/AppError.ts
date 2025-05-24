import { HttpResponse } from "../HttpResponse";

export class AppError extends HttpResponse {
  public readonly errors?: string[];

  constructor(message: string, statusCode = 400, errors?: string[]) {
    super(message, statusCode);
    this.errors = errors;
  }

  public toResponse() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
    };
  }
}
