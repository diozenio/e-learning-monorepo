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
  success: boolean;
  statusCode: number;
  message: string;
  data: AuthPayload;
};

export type SignUpResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AuthPayload;
};

export type LogoutResponse = {
  success: boolean;
  statusCode: number;
  message: string;
};
