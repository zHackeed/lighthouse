"use client";

import { useState, useTransition } from "react";
import { KeyRoundIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

export function PasskeysCard() {
  // The list refreshes by itself after a passkey is added or deleted.
  const { data: passkeys, isPending } = authClient.useListPasskeys();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function run(action: () => Promise<{ error: { message?: string } | null } | undefined>, fallback: string) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (result?.error) setError(result.error.message ?? fallback);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passkeys</CardTitle>
        <CardDescription>Sign in with your device&apos;s fingerprint, face or screen lock instead of a password.</CardDescription>
        <CardAction>
          <Button
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={() => run(() => authClient.passkey.addPasskey(), "Could not add the passkey.")}
          >
            <PlusIcon />
            Add passkey
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <FormError message={error} />
        {isPending ? (
          <Spinner className="text-muted-foreground" />
        ) : passkeys?.length ? (
          <ul className="divide-y rounded-lg border">
            {passkeys.map((passkey) => (
              <li key={passkey.id} className="flex items-center gap-3 px-3 py-2.5 text-sm">
                <KeyRoundIcon className="size-4 text-muted-foreground" />
                <span className="flex-1">
                  {passkey.name ?? "Passkey"}
                  <span className="block text-xs text-muted-foreground">
                    Added {new Date(passkey.createdAt).toLocaleDateString()}
                  </span>
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Delete ${passkey.name ?? "passkey"}`}
                  disabled={pending}
                  onClick={() =>
                    run(() => authClient.passkey.deletePasskey({ id: passkey.id }), "Could not delete the passkey.")
                  }
                >
                  <Trash2Icon />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No passkeys yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
