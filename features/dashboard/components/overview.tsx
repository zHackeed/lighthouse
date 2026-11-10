import { requireActiveOrganization } from "@/lib/session";
import { getActiveOrganization } from "@/features/organizations/queries";

// Placeholder until the dashboard design is implemented.
export async function Overview() {
  const { user } = await requireActiveOrganization();
  const organization = await getActiveOrganization();

  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">{organization?.name}</h1>
      <p className="text-muted-foreground">Signed in as {user.email}.</p>
    </section>
  );
}
