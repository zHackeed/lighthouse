"use client";

import { useRouter } from "next/navigation";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { useFormAction } from "@/lib/forms";
import { totpSchema } from "@/features/auth/schemas";
import { AFTER_SIGN_IN_PATH } from "@/features/auth/routes";

export function TotpForm() {
  const router = useRouter();

  const { onSubmit, pending, errors, formError } = useFormAction(totpSchema, async ({ code }) => {
    const { error } = await authClient.twoFactor.verifyTotp({ code });
    if (error) return error.message ?? "That code did not work. Codes rotate every 30 seconds.";
    router.push(AFTER_SIGN_IN_PATH);
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.code}>
          <FieldLabel htmlFor="code" className="sr-only">
            Two-factor code
          </FieldLabel>
          <InputOTP id="code" name="code" maxLength={6} inputMode="numeric" autoComplete="one-time-code" autoFocus>
            <InputOTPGroup className="w-full *:flex-1">
              {Array.from({ length: 6 }, (_, index) => (
                <InputOTPSlot key={index} index={index} className="h-12 text-lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <FieldError>{errors.code}</FieldError>
        </Field>
        <FormError message={formError} />
        <SubmitButton pending={pending}>{pending ? "Verifying…" : "Verify and continue"}</SubmitButton>
      </FieldGroup>
    </form>
  );
}
