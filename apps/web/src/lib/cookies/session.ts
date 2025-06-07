import { cookies } from 'next/headers';

const COOKIE_NAME = 'session_token';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: '/',
};

export const sessionCookieStore = {
  /**
   * Sets the session cookie.
   * @param token The JWT token to be stored.
   */
  set(token: string) {
    cookies().then((cookieStore) => {
      cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);
    });
  },

  /**
   * Retrieves the session cookie value.
   * @returns The token, or `null` if the cookie does not exist.
   */
  get() {
    return cookies().then((cookieStore) => {
      return cookieStore.get(COOKIE_NAME)?.value ?? null;
    });
  },

  /**
   * Deletes the session cookie to perform logout.
   */
  clear() {
    cookies().then((cookieStore) => {
      cookieStore.delete(COOKIE_NAME);
    });
  },
};
