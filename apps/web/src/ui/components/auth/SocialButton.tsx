'use client';

import { FcGoogle } from 'react-icons/fc';

import { Button, ButtonProps } from '@/ui/primitives/button';

type SocialProvider = 'google';

interface SocialButtonProps {
  provider: SocialProvider;
  onClick?: () => void;
  label: string;
  disabled?: boolean;
}

const buttonVariants: Record<SocialProvider, ButtonProps['variant']> = {
  google: 'outline',
};

function SocialButton({
  provider = 'google',
  onClick,
  label,
  disabled,
}: SocialButtonProps) {
  const renderIcon = () => {
    if (provider === 'google') return <FcGoogle />;
    // Add other provider icons here
    return null;
  };

  return (
    <Button
      type="button"
      disabled={disabled}
      variant={buttonVariants[provider]}
      onClick={onClick}
    >
      {renderIcon()}
      {label}
    </Button>
  );
}

export { SocialButton };
