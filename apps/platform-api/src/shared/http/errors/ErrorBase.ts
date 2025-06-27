import { HttpResponse } from '../HttpResponse';

export abstract class ErrorBase<ErrorType = string[]> extends HttpResponse {
  public readonly errors?: ErrorType;

  constructor(message: string, statusCode: number, errors?: ErrorType) {
    super(message, statusCode);
    this.errors = errors;
  }

  public abstract toResponse(): {
    message: string;
    errors: unknown;
    success: boolean;
    statusCode: number;
  };
}
