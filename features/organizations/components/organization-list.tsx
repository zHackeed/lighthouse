"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import { FormError } from "@/components/form-error";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";

type OrganizationSummary = { id: string; name: string; slug: string };

export function OrganizationList({ organizations, activeId }: { organizations: OrganizationSummary[]; activeId: string | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function open(organizationId: string) {
    setError(null);
    startTransition(async () => {
      const { error } = await authClient.organization.setActive({ organizationId });
      if (error) setError(error.message ?? "Could not open the organization.");
      else router.push("/");
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="divide-y overflow-hidden rounded-lg border">
        {organizations.map((organization) => (
          <li key={organization.id}>
            <button
              type="button"
              disabled={pending}
              onClick={() => open(organization.id)}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted disabled:opacity-50"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-muted text-xs font-semibold uppercase">
                {organization.name.slice(0, 2)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{organization.name}</span>
                <span className="block truncate font-mono text-xs text-muted-foreground">{organization.slug}</span>
              </span>
              {organization.id === activeId && <Badge variant="secondary">current</Badge>}
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>
      <FormError message={error} />
    </div>
  );
}
