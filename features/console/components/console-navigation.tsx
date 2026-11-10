import { getSession, isAdmin } from "@/lib/session";
import { ConsoleNav } from "./console-nav";

/** Adds admin links for administrators. Hiding links is UX only; admin pages check the role themselves. */
export async function ConsoleNavigation() {
  const session = await getSession();
  return <ConsoleNav showAdmin={isAdmin(session?.user.role)} />;
}
