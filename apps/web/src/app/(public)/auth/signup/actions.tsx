'use server';

import { AxiosError } from 'axios';
import { ZodError } from 'zod';

import { services } from '@/container';
import { AuthPayload } from '@/core/domain/models/auth';
import { FormState } from '@/hooks/useFormState';
import { sessionCookieStore } from '@/lib/cookies/session';
import { validateSignUpCredentials } from '@/utils/auth/validate';

export async function signupAction(
  formData: FormData
): Promise<FormState<AuthPayload>> {
  try {
    const { name, email, password } = validateSignUpCredentials(formData);

    const response = await services.AuthService.signUpWithCredentials(
      email,
      password,
      name
    );
    const data = response.data;

    sessionCookieStore.set(data.token);

    return {
      success: true,
      message: 'Sign-up successful',
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
          error.response.data.message || 'An error occurred during sign-up.',
        errors: null,
      };
    }

    console.error('Unexpected error during sign-up:', error);

    return {
      success: false,
      message: 'An unexpected error occurred.',
      errors: null,
    };
  }
}
