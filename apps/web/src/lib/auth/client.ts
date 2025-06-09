import axios, { AxiosError } from 'axios';

export const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  withCredentials: true,
});

function isErrorWithMessage(data: unknown): data is { message: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof (
      data as {
        message: unknown;
      }
    ).message === 'string'
  );
}

authClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const data = error.response?.data;
    const errorMessage = isErrorWithMessage(data)
      ? data.message
      : 'Unexpected error from auth API.';

    return Promise.reject(new Error(errorMessage));
  }
);
