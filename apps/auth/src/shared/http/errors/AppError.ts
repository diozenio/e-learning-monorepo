import { ErrorBase } from './ErrorBase';

export class AppError<ErrorType = string[]> extends ErrorBase<ErrorType> {
  constructor(message: string, statusCode = 400, errors?: ErrorType) {
    super(message, statusCode, errors);
  }

  public toResponse() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
    };
  }
}
