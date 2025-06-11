'use server';

import { sessionCookieStore } from '@/lib/cookies/session';

export async function clearCookiesAction() {
  try {
    await sessionCookieStore.clear();

    return {
      success: true,
      message: 'Cookies cleared successfully.',
      errors: null,
    };
  } catch (error) {
    console.error('Error clearing cookies:', error);

    return {
      success: false,
      message: 'An unexpected error occurred.',
      errors: null,
    };
  }
}
