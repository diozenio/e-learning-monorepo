'use server';

import { AxiosError } from 'axios';
import { ZodError } from 'zod';

import { services } from '@/container';
import { AuthPayload } from '@/core/domain/models/auth';
import { FormState } from '@/hooks/useFormState';
import { sessionCookieStore } from '@/lib/cookies/session';
import { validateLoginCredentials } from '@/utils/auth/validate';

export async function loginAction(
  formData: FormData
): Promise<FormState<AuthPayload>> {
  try {
    const { email, password } = validateLoginCredentials(formData);

    const response = await services.AuthService.login(email, password);
    const data = response.data;

    await sessionCookieStore.set(data.token);

    return {
      success: true,
      message: 'Login successful',
      errors: null,
      data,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: null,
        errors: error.flatten().fieldErrors,
      };
    }

    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data.message || 'An error occurred during login.',
        errors: null,
      };
    }

    console.error('Unexpected error during login:', error);

    return {
      success: false,
      message: 'An unexpected error occurred.',
      errors: null,
    };
  }
}
