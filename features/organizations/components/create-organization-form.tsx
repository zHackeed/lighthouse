"use client";

import { useRouter } from "next/navigation";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useFormAction } from "@/lib/forms";
import { createOrganizationSchema, organizationSlug } from "@/features/organizations/schemas";

export function CreateOrganizationForm() {
  const router = useRouter();
  const { onSubmit, pending, errors, formError } = useFormAction(createOrganizationSchema, async ({ name }) => {
    const { error } = await authClient.organization.create({ name, slug: organizationSlug(name) });
    if (error) return error.message ?? "Could not create the organization.";
    router.push("/");
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="organization-name">New organization</FieldLabel>
          <Input id="organization-name" name="name" autoComplete="organization" placeholder="Acme Cloud" aria-invalid={!!errors.name} />
          <FieldError>{errors.name}</FieldError>
        </Field>
        <FormError message={formError} />
        <SubmitButton pending={pending} variant="outline">
          Create organization
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
