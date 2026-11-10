import type { Metadata } from "next";
import { Suspense } from "react";
import { PageLoading } from "@/components/page-loading";
import { Overview } from "@/features/dashboard/components/overview";

export const metadata: Metadata = { title: "Overview" };

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <Suspense fallback={<PageLoading />}>
        <Overview />
      </Suspense>
    </div>
  );
}
