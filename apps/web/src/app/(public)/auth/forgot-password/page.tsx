'use client';
import { ReactNode, useState } from 'react';

import { ForgotPasswordFlow } from '@/ui/components/auth/ForgotPasswordFlow';
import { AuthLayout } from '@/ui/layouts/auth';

export type FlowStepValue = 'email' | 'otp' | 'reset';
export type FlowStep = {
  value: FlowStepValue;
  description: string | ReactNode;
};

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<FlowStep>({
    value: 'email',
    description: 'Enter your email address to receive a verification code.',
  });

  return (
    <AuthLayout title="Forgot Your Password?" description={step.description}>
      <ForgotPasswordFlow step={step} setStep={setStep} />
    </AuthLayout>
  );
}
