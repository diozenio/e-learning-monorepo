import Image from "next/image";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="h-screen w-full flex flex-row">
      {/* Left Side */}
      <div className="h-full w-1/2 py-4 px-8">
        <div className="w-full h-full mx-auto flex flex-col items-center justify-center space-y-8 max-w-112">
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-4xl">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="flex flex-col gap-6 w-full">{children}</div>
        </div>
      </div>

      {/* Right Side */}
      <div className="h-full w-1/2 ">
        <div className="w-full h-full bg-primary relative select-none">
          <Image
            src={"/images/auth.jpg"}
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
