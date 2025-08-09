'use client';

import { useEffect, useState, useTransition } from 'react';

import {
  ForgotPasswordData,
  requestPasswordResetAction,
  verifyOtpAction,
} from '@/app/(public)/auth/forgot-password/actions';
import { FormState, useFormState } from '@/hooks/useFormState';
import { Button } from '@/ui/primitives/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/ui/primitives/input-otp';
import { Label } from '@/ui/primitives/label';

interface OtpStepProps {
  email: string;
  onSuccess: () => void;
}

const COUNTDOWN_SECONDS = 3;

export function OtpStep({ email, onSuccess }: OtpStepProps) {
  const [formState, handleVerify, isVerifyPending] = useFormState(
    verifyOtpAction,
    onSuccess
  );

  const [isResendPending, startResendTransition] = useTransition();

  const [resendState, setResendState] = useState<FormState<ForgotPasswordData>>(
    {
      success: false,
      message: null,
      errors: null,
    }
  );

  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  function handleResend() {
    startResendTransition(async () => {
      const formData = new FormData();
      formData.append('email', email);
      const state = await requestPasswordResetAction(formData);
      setResendState(state);

      if (state.success) {
        setCountdown(COUNTDOWN_SECONDS);
      }
    });
  }

  return (
    <>
      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex flex-col items-center gap-2">
          <Label htmlFor="otp-input">Verification Code</Label>
          <InputOTP inputMode="numeric" maxLength={6} name="otp" id="otp-input">
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {formState.errors?.otp && (
            <p className="text-xs text-red-500">{formState.errors.otp[0]}</p>
          )}
          {resendState.message && !resendState.success && (
            <p className="text-xs text-red-500">{resendState.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" loading={isVerifyPending}>
          Verify Code
        </Button>
      </form>

      <div className="text-center text-sm">
        {"Didn't receive the code? "}
        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0 || isResendPending}
          className="text-primary disabled:text-muted-foreground font-semibold underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:no-underline"
        >
          {isResendPending && 'Sending...'}
          {!isResendPending &&
            (countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code')}
        </button>
      </div>
    </>
  );
}
