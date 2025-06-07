export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthPayload = {
  token: string;
  user: User;
};

export type LoginResponse = {
  statusCode: number;
  message: string;
  data: AuthPayload;
};

export type SignUpResponse = {
  statusCode: number;
  message: string;
  data: AuthPayload;
};
