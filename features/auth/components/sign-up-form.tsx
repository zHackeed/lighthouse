"use client";

import { useState } from "react";
import { ClockIcon } from "lucide-react";
import { FormError } from "@/components/form-error";
import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useFormAction } from "@/lib/forms";
import { signUpSchema } from "@/features/auth/schemas";

export function SignUpForm() {
  const [created, setCreated] = useState(false);
  const { onSubmit, pending, errors, formError } = useFormAction(signUpSchema, async ({ name, email, password }) => {
    const { error } = await authClient.signUp.email({ name, email, password });
    if (error) return error.message ?? "Could not create the account. Try again.";
    setCreated(true);
  });

  // New accounts start disabled (see lib/auth-server.ts), so there is no session to continue with.
  if (created) {
    return (
      <Alert>
        <ClockIcon />
        <AlertTitle>Account pending activation</AlertTitle>
        <AlertDescription>An administrator needs to approve your account. You can sign in once it is activated.</AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} />
          <FieldError>{errors.name}</FieldError>
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Work email</FieldLabel>
          <Input id="email" name="email" type="email" autoComplete="username" aria-invalid={!!errors.email} />
          <FieldError>{errors.email}</FieldError>
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <PasswordInput id="password" name="password" autoComplete="new-password" aria-invalid={!!errors.password} />
          {errors.password ? <FieldError>{errors.password}</FieldError> : <FieldDescription>At least 8 characters.</FieldDescription>}
        </Field>
        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
          />
          <FieldError>{errors.confirmPassword}</FieldError>
        </Field>
        <FormError message={formError} />
        <SubmitButton pending={pending}>{pending ? "Creating account…" : "Create account"}</SubmitButton>
      </FieldGroup>
    </form>
  );
}
