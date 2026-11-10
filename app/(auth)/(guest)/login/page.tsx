import type { Metadata } from "next";
import { AuthCard, AuthFooterLink } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthCard
      title={`Log in to your account`}
      description="Welcome back, please use your email and password."
      footer={<AuthFooterLink prompt={`New around here?`} href="/sign-up">Create an account</AuthFooterLink>}
    >
      <LoginForm />
    </AuthCard>
  );
}
