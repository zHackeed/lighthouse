import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { RecoveryCodeForm } from "@/features/auth/components/recovery-code-form";

export const metadata: Metadata = { title: "Recovery code" };

export default function RecoveryCodePage() {
  return (
    <AuthCard
      title="Use a recovery code"
      step="step 2 of 2"
      backHref="/two-factor"
      description="Enter one of the recovery codes you saved when you turned on two-factor. Each code works once."
    >
      <RecoveryCodeForm />
    </AuthCard>
  );
}
