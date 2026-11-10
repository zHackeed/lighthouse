import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AFTER_SIGN_IN_PATH } from "@/features/auth/routes";

export async function RedirectIfSignedIn() {
  const session = await getSession();
  if (session) redirect(session.session.activeOrganizationId ? "/" : AFTER_SIGN_IN_PATH);
  return null;
}
