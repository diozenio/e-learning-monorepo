'use client';

import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FlowStep } from '@/app/(public)/auth/forgot-password/page';
import { Button } from '@/ui/primitives/button';

import { EmailStep, OtpStep, ResetPasswordStep } from './steps';

const variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const motionProps = {
  variants,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { duration: 0.3 },
  className: 'space-y-6',
};

interface ForgotPasswordFlowProps {
  step: FlowStep;
  setStep: (step: FlowStep) => void;
}

export function ForgotPasswordFlow({ step, setStep }: ForgotPasswordFlowProps) {
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  const goToEmailStep = () => {
    setStep({
      value: 'email',
      description: 'Enter your email address to receive a verification code.',
    });
  };

  const goToOtpStep = () => {
    setStep({
      value: 'otp',
      description: (
        <>
          We sent a 6-digit code to <strong>{userEmail}</strong>. Please check
          your inbox.
        </>
      ),
    });
  };

  const goToResetStep = () => {
    setStep({
      value: 'reset',
      description: 'Enter your new password.',
    });
  };

  const nextStep = () => {
    if (step.value === 'email') {
      goToOtpStep();
    } else if (step.value === 'otp') {
      goToResetStep();
    }
  };

  const handleOtpSuccess = () => {
    nextStep();
  };

  const renderStep = () => {
    switch (step.value) {
      case 'email':
        return <EmailStep setUserEmail={setUserEmail} onSuccess={nextStep} />;
      case 'otp':
        return <OtpStep email={userEmail} onSuccess={handleOtpSuccess} />;
      case 'reset':
        return <ResetPasswordStep />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <AnimatePresence mode="wait">
        <motion.div key={step.value} {...motionProps}>
          {renderStep()}
          <div className="text-center text-sm">
            {step.value === 'email' ? (
              <Button
                variant="link"
                className="text-primary text-sm font-semibold hover:cursor-pointer hover:underline"
                onClick={() => router.push('/auth/login')}
              >
                <ArrowLeft />
                Back to login
              </Button>
            ) : (
              <Button variant="link" onClick={goToEmailStep}>
                <ArrowLeft /> Return
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
