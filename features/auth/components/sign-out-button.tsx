"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function signOut() {
    startTransition(async () => {
      await authClient.signOut();
      router.push("/login");
    });
  }

  return (
    <Button variant="ghost" size="sm" disabled={pending} onClick={signOut}>
      <LogOutIcon />
      Sign out
    </Button>
  );
}
