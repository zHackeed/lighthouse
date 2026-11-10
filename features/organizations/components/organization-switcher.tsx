import Link from "next/link";
import { ChevronsUpDownIcon } from "lucide-react";
import { getActiveOrganization } from "@/features/organizations/queries";

/** Active organization name in the console header; links to the picker. */
export async function OrganizationSwitcher() {
  const organization = await getActiveOrganization();

  return (
    <Link
      href="/organizations"
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-muted"
    >
      {organization?.name ?? "Choose organization"}
      <ChevronsUpDownIcon className="size-3.5 text-muted-foreground" />
    </Link>
  );
}
