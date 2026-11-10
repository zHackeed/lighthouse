import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(2, "Use at least 2 characters.").max(64, "Use at most 64 characters."),
});

export function organizationSlug(name: string) {
  const base = name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return `${base || "org"}-${crypto.randomUUID().slice(0, 6)}`;
}
