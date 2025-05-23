import { SignUpForm } from "@/ui/components/auth/SignUpForm";
import { AuthLayout } from "@/ui/layouts/auth";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create account"
      description="We just need a few details to get you started."
    >
      <SignUpForm />
    </AuthLayout>
  );
}
