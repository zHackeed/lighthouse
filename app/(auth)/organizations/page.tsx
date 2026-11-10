import type { Metadata } from "next";
import { Suspense } from "react";
import { PageLoading } from "@/components/page-loading";
import { AuthCard } from "@/features/auth/components/auth-card";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { OrganizationPicker } from "@/features/organizations/components/organization-picker";

export const metadata: Metadata = { title: "Organizations" };

export default function OrganizationsPage() {
  return (
    <AuthCard
      title="Choose an organization"
      description="Pick where you want to work, or create a new organization."
      footer={<SignOutButton />}
    >
      <Suspense fallback={<PageLoading />}>
        <OrganizationPicker />
      </Suspense>
    </AuthCard>
  );
}
