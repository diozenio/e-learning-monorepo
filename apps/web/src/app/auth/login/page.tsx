import { LoginForm } from "@/ui/components/auth/LoginForm";
import { AuthLayout } from "@/ui/layouts/auth";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Enter your email and password to sign in to your account."
    >
      <LoginForm />
    </AuthLayout>
  );
}
