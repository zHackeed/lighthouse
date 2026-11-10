import type { Metadata } from "next";
import { Suspense } from "react";
import { PageLoading } from "@/components/page-loading";
import { UsersTable } from "@/features/admin/components/users-table";

export const metadata: Metadata = { title: "Users" };

export default function AdminUsersPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Every account on the platform. Visible to administrators only.</p>
      </header>
      <Suspense fallback={ <PageLoading />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}
