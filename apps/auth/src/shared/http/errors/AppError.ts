import { ErrorBase } from './ErrorBase';

export class AppError<ErrorType = string[]> extends ErrorBase<ErrorType> {
  constructor(message: string, statusCode = 400, errors?: ErrorType) {
    super(message, statusCode, errors);
    this.success = false;
  }

  public toResponse() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
    };
  }
}
