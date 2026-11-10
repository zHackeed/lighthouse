import type { Metadata } from "next";
import { AuthCard, AuthFooterLink } from "@/features/auth/components/auth-card";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create your account"
      description="You can create or join an organization after sign-up."
      footer={<AuthFooterLink prompt="Already have an account?" href="/login">Sign in</AuthFooterLink>}
    >
      <SignUpForm />
    </AuthCard>
  );
}
