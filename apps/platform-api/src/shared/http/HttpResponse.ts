type Response = {
  success: boolean;
  message: string;
  statusCode: number;
  data?: unknown;
};

export class HttpResponse {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data?: unknown;
  public success: boolean = true;

  constructor(message: string, statusCode = 200, data?: unknown) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  public toResponse() {
    const response: Response = {
      success: this.success,
      message: this.message,
      statusCode: this.statusCode,
    };

    if (this.data) {
      response.data = this.data;
    }

    return response;
  }
}
