"use client";

import { useRouter } from "next/navigation";
import { FormError } from "@/components/form-error";
import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useFormAction } from "@/lib/forms";
import { passwordSchema } from "@/features/auth/schemas";

export function DisableTwoFactorForm() {
  const router = useRouter();

  const { onSubmit, pending, errors, formError } = useFormAction(passwordSchema, async ({ password }) => {
    const { error } = await authClient.twoFactor.disable({ password });
    if (error) return error.message ?? "Could not turn off two-factor.";
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="disable-password">Confirm your password to turn it off</FieldLabel>
          <PasswordInput
            id="disable-password"
            name="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
          />
          <FieldError>{errors.password}</FieldError>
        </Field>
        <FormError message={formError} />
        <SubmitButton pending={pending} variant="destructive" className="self-start">
          Turn off two-factor
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
