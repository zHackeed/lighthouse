"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

/** Activates a pending account. The admin plugin's unban endpoint checks the caller's permission. */
export function ActivateUserButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function activate() {
    setError(null);
    startTransition(async () => {
      const { error } = await authClient.admin.unbanUser({ userId });
      if (error) setError(error.message ?? "Could not activate the account.");
      else router.refresh();
    });
  }

  return (
    <Button variant="outline" size="sm" disabled={pending} onClick={activate} title={error ?? undefined} aria-invalid={!!error}>
      {error ? "Retry" : "Activate"}
    </Button>
  );
}
