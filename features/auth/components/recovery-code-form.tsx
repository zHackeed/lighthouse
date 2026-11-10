"use client";

import { useRouter } from "next/navigation";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useFormAction } from "@/lib/forms";
import { recoveryCodeSchema } from "@/features/auth/schemas";
import { AFTER_SIGN_IN_PATH } from "@/features/auth/routes";

export function RecoveryCodeForm() {
  const router = useRouter();

  const { onSubmit, pending, errors, formError } = useFormAction(recoveryCodeSchema, async ({ code }) => {
    const { error } = await authClient.twoFactor.verifyBackupCode({ code });
    if (error) return error.message ?? "That recovery code did not work.";
    router.push(AFTER_SIGN_IN_PATH);
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.code}>
          <FieldLabel htmlFor="code">Recovery code</FieldLabel>
          <Input
            id="code"
            name="code"
            autoComplete="off"
            spellCheck={false}
            className="font-mono"
            aria-invalid={!!errors.code}
            autoFocus
          />
          <FieldError>{errors.code}</FieldError>
        </Field>
        <FormError message={formError} />
        <SubmitButton pending={pending}>{pending ? "Verifying…" : "Verify and continue"}</SubmitButton>
      </FieldGroup>
    </form>
  );
}
