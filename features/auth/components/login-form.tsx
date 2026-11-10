"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { KeyRoundIcon } from "lucide-react";
import { FormError } from "@/components/form-error";
import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PENDING_ACTIVATION_MESSAGE } from "@/lib/account-status";
import { authClient } from "@/lib/auth-client";
import { useFormAction } from "@/lib/forms";
import { signInSchema } from "@/features/auth/schemas";
import { AFTER_SIGN_IN_PATH } from "@/features/auth/routes";

export function LoginForm() {
  const router = useRouter();
  const [passkeyPending, startPasskey] = useTransition();
  const [passkeyError, setPasskeyError] = useState<string | null>(null);

  const { onSubmit, pending, errors, formError } = useFormAction(signInSchema, async (credentials) => {
    const { data, error } = await authClient.signIn.email(credentials);
    if (error) return error.message ?? "Sign-in failed. Try again.";

    const needsTwoFactor = "twoFactorRedirect" in data && data.twoFactorRedirect;

    router.push(needsTwoFactor ? "/two-factor" : AFTER_SIGN_IN_PATH);
  });

  useEffect(() => {
    async function offerPasskeyAutofill() {
      const available = await window.PublicKeyCredential?.isConditionalMediationAvailable?.();
      if (!available) return;

      const { error } = await authClient.signIn.passkey({ autoFill: true });
      if (!error) router.push(AFTER_SIGN_IN_PATH);
    }

    void offerPasskeyAutofill();
  }, [router]);

  function signInWithPasskey() {
    setPasskeyError(null);
    startPasskey(async () => {
      const { error } = await authClient.signIn.passkey();
      if (error) setPasskeyError(error.message ?? "Passkey sign-in failed. Try again.");
      else router.push(AFTER_SIGN_IN_PATH);
    });
  }

  const busy = pending || passkeyPending;
  const message = formError ?? passkeyError;

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" autoComplete="username webauthn" aria-invalid={!!errors.email} />
          <FieldError>{errors.email}</FieldError>
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <PasswordInput id="password" name="password" autoComplete="current-password" aria-invalid={!!errors.password} />
          <FieldError>{errors.password}</FieldError>
        </Field>
        <FormError message={message} notice={message === PENDING_ACTIVATION_MESSAGE} />
        <SubmitButton pending={pending} disabled={busy}>
          {pending ? "Signing in…" : "Sign in"}
        </SubmitButton>
        <FieldSeparator>or</FieldSeparator>
        <Button type="button" variant="outline" size="lg" disabled={busy} onClick={signInWithPasskey}>
          <KeyRoundIcon />
          Sign in with a passkey
        </Button>
      </FieldGroup>
    </form>
  );
}
