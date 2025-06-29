import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PLATFORM_API_URL + '/api',
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

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const data = error.response?.data;
    const errorMessage = isErrorWithMessage(data)
      ? data.message
      : 'Unexpected error from API.';

    return Promise.reject(new Error(errorMessage));
  }
);
