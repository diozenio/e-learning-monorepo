import Image from 'next/image';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-row">
      {/* Left Side */}
      <div className="h-full w-1/2 px-8 py-4">
        <div className="max-w-112 mx-auto flex h-full w-full flex-col items-center justify-center space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="flex w-full flex-col gap-6">{children}</div>
        </div>
      </div>

      {/* Right Side */}
      <div className="h-full w-1/2">
        <div className="bg-primary relative h-full w-full select-none">
          <Image
            src={'/images/auth.jpg'}
            fill
            alt="Background"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export { AuthLayout };
