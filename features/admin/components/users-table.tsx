import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PENDING_ACTIVATION } from "@/lib/account-status";
import { auth } from "@/lib/auth-server";
import { requireAdmin } from "@/lib/session";
import { ActivateUserButton } from "./activate-user-button";

const PAGE_SIZE = 100;

export async function UsersTable() {
  await requireAdmin();
  const { users, total } = await auth.api.listUsers({
    headers: await headers(),
    query: { limit: PAGE_SIZE, sortBy: "createdAt", sortDirection: "desc" },
  });

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        {total} {total === 1 ? "user" : "users"}
        {total > PAGE_SIZE && ` · showing the newest ${PAGE_SIZE}`}
      </p>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role ?? "user"}</Badge>
                </TableCell>
                <TableCell>
                  <UserStatus banned={!!user.banned} banReason={user.banReason} />
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {user.createdAt.toISOString().slice(0, 10)}
                </TableCell>
                <TableCell className="text-right">
                  {user.banned && user.banReason === PENDING_ACTIVATION && <ActivateUserButton userId={user.id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function UserStatus({ banned, banReason }: { banned: boolean; banReason?: string | null }) {
  if (!banned) return <Badge variant="secondary">active</Badge>;
  if (banReason === PENDING_ACTIVATION) return <Badge variant="outline">pending</Badge>;
  return <Badge variant="destructive">banned</Badge>;
}
