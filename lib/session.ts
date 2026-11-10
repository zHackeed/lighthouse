import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth-server";

// Data access layer for the current session. Server Components and server actions call these;
// never trust the client for authorization. Under Cache Components, call them inside <Suspense>.

/** Cached per request, so several components can ask without extra DB reads. */
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

/** The current session, or a redirect to the sign-in page. Call at the top of every protected server action. */
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** The current session with its active organization, or a redirect to the organization picker. */
export async function requireActiveOrganization() {
  const session = await requireSession();
  const organizationId = session.session.activeOrganizationId;
  if (!organizationId) redirect("/organizations");
  return { ...session, organizationId };
}

/** Platform administrators only (admin plugin role). Everyone else gets a 404, not a hint the page exists. */
export async function requireAdmin() {
  const session = await requireSession();
  if (!isAdmin(session.user.role)) notFound();
  return session;
}

/** The admin plugin stores roles as a comma-separated string. */
export function isAdmin(role: string | null | undefined) {
  return role?.split(",").includes("admin") ?? false;
}
