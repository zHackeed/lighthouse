import { requireSession } from "@/lib/session";
import { listMyOrganizations } from "@/features/organizations/queries";
import { CreateOrganizationForm } from "./create-organization-form";
import { OrganizationList } from "./organization-list";

export async function OrganizationPicker() {
  const { session } = await requireSession();
  const organizations = await listMyOrganizations();

  return (
    <div className="flex flex-col gap-5">
      {organizations.length > 0 ? (
        <OrganizationList
          organizations={organizations.map(({ id, name, slug }) => ({ id, name, slug }))}
          activeId={session.activeOrganizationId ?? null}
        />
      ) : (
        <p className="text-sm text-muted-foreground">You are not in any organization yet. Create one to continue.</p>
      )}
      <CreateOrganizationForm />
    </div>
  );
}
