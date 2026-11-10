"use client";

import { useState, useTransition, type FormEvent } from "react";
import { z } from "zod";

/** Field name → first error message, ready for <FieldError>. */
export type FieldErrors = Partial<Record<string, string>>;

/** Returns an error message to show above the form, or nothing on success. */
type SubmitHandler<T> = (data: T) => Promise<string | null | undefined | void>;

export function useFormAction<T>(schema: z.ZodType<T>, onValid: SubmitHandler<T>) {
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setFormError(null);
    startTransition(async () => {
      const message = await onValid(parsed.data);
      if (message) setFormError(message);
    });
  }

  return { onSubmit, pending, errors, formError };
}

function toFieldErrors(error: z.ZodError): FieldErrors {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  return Object.fromEntries(Object.entries(flat).map(([field, messages]) => [field, messages?.[0]]));
}
