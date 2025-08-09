'use server';

import { z } from 'zod';

import { FormState } from '@/hooks/useFormState';
import {
  validateForgotPassword,
  validateOtp,
  validateResetPassword,
} from '@/utils/auth/validate';

export type ForgotPasswordData = { email: string };

export async function requestPasswordResetAction(
  formData: FormData
): Promise<FormState<ForgotPasswordData>> {
  try {
    console.log(`Password reset requested for: ${formData.get('email')}`);
    const { email } = validateForgotPassword(formData);
    // TODO: Implement actual email sending logic
    return {
      success: true,
      message: 'Recovery link sent successfully!',
      errors: null,
      data: { email },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error.',
        errors: error.flatten().fieldErrors,
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred.',
      errors: null,
    };
  }
}

export async function verifyOtpAction(
  formData: FormData
): Promise<FormState<null>> {
  try {
    const { otp } = validateOtp(formData);
    console.log(`Verifying OTP: ${otp}`);
    // TODO: Implement actual OTP verification logic
    if (otp !== '123456') {
      // Simulate an error for testing
      return {
        success: false,
        message: 'Invalid OTP code.',
        errors: { otp: ['The code you entered is incorrect.'] },
      };
    }
    return { success: true, message: 'Code verified!', errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error.',
        errors: error.flatten().fieldErrors,
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred.',
      errors: null,
    };
  }
}

export async function resetPasswordAction(
  formData: FormData
): Promise<FormState<null>> {
  try {
    const { password } = validateResetPassword(formData);
    console.log(`Resetting password. New password length: ${password.length}`);
    // TODO: Implement actual password reset logic
    return {
      success: true,
      message: 'Password reset successfully!',
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error.',
        errors: error.flatten().fieldErrors,
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred.',
      errors: null,
    };
  }
}
