"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { FormError } from "@/components/form-error";
import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useFormAction } from "@/lib/forms";
import { passwordSchema, totpSchema } from "@/features/auth/schemas";

type Enrollment = { totpURI: string; backupCodes: string[] };

/** Step 1 confirms the password and creates the secret; step 2 verifies a first code to turn 2FA on. */
export function EnableTwoFactorForm() {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

  const start = useFormAction(passwordSchema, async ({ password }) => {
    const { data, error } = await authClient.twoFactor.enable({ password });
    if (error) return error.message ?? "Could not start two-factor setup.";
    if (data.method !== "totp") return "Unexpected two-factor method.";
    setEnrollment(data);
  });

  if (enrollment) return <VerifyEnrollment enrollment={enrollment} />;

  return (
    <form onSubmit={start.onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={!!start.errors.password}>
          <FieldLabel htmlFor="enable-password">Confirm your password</FieldLabel>
          <PasswordInput
            id="enable-password"
            name="password"
            autoComplete="current-password"
            aria-invalid={!!start.errors.password}
          />
          <FieldError>{start.errors.password}</FieldError>
        </Field>
        <FormError message={start.formError} />
        <SubmitButton pending={start.pending} className="self-start">
          Set up two-factor
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}

function VerifyEnrollment({ enrollment }: { enrollment: Enrollment }) {
  const router = useRouter();
  const secret = new URL(enrollment.totpURI).searchParams.get("secret");

  const verify = useFormAction(totpSchema, async ({ code }) => {
    const { error } = await authClient.twoFactor.verifyTotp({ code });
    if (error) return error.message ?? "That code did not work. Try the current one.";
    router.refresh();
  });

  return (
    <FieldGroup>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* White frame keeps the code scannable in dark mode. */}
        <div className="self-start rounded-lg bg-white p-3">
          <QRCode value={enrollment.totpURI} size={144} />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p>Scan the code with your authenticator app, or enter the key manually:</p>
          <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs break-all">{secret}</code>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Recovery codes</p>
        <p className="text-sm text-muted-foreground">
          Save these somewhere safe. Each one signs you in once if you lose your device.
        </p>
        <ul className="grid grid-cols-2 gap-1 rounded-lg border bg-muted/40 p-3 font-mono text-sm">
          {enrollment.backupCodes.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={verify.onSubmit} noValidate>
        <FieldGroup>
          <Field data-invalid={!!verify.errors.code}>
            <FieldLabel htmlFor="enable-code">Code from the app</FieldLabel>
            <Input
              id="enable-code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              className="max-w-40 font-mono tracking-widest"
              aria-invalid={!!verify.errors.code}
            />
            {verify.errors.code ? (
              <FieldError>{verify.errors.code}</FieldError>
            ) : (
              <FieldDescription>Two-factor turns on once this code checks out.</FieldDescription>
            )}
          </Field>
          <FormError message={verify.formError} />
          <SubmitButton pending={verify.pending} className="self-start">
            Verify and turn on
          </SubmitButton>
        </FieldGroup>
      </form>
    </FieldGroup>
  );
}
