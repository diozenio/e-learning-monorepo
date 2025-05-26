export type User = {
  id: string;
  name: string;
  email: string;
};

export type LoginResponse = {
  statusCode: number;
  message: string;
  data: {
    token: string;
    user: User;
  };
};

export type SignUpResponse = {
  statusCode: number;
  message: string;
  data: {
    token: string;
    user: User;
  };
};
