import type { Metadata } from "next";
import { AuthCard, AuthFooterLink } from "@/features/auth/components/auth-card";
import { TotpForm } from "@/features/auth/components/totp-form";

export const metadata: Metadata = { title: "Two-factor code" };

export default function TwoFactorPage() {
  return (
    <AuthCard
      title="Two-factor code"
      step="step 2 of 2"
      backHref="/login"
      description="Enter the 6-digit code from your authenticator app."
      footer={<AuthFooterLink prompt="Lost your device?" href="/two-factor/recovery">Use a recovery code</AuthFooterLink>}
    >
      <TotpForm />
    </AuthCard>
  );
}
