import type { Metadata } from "next";
import { Suspense } from "react";
import { PageLoading } from "@/components/page-loading";
import { SecuritySettings } from "@/features/security/components/security-settings";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Security</h1>
        <p className="text-muted-foreground">Two-factor authentication and passkeys for your account.</p>
      </header>
      <Suspense fallback={<PageLoading />}>
        <SecuritySettings />
      </Suspense>
    </div>
  );
}
