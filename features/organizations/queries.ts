import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth-server";

export const listMyOrganizations = cache(async () => auth.api.listOrganizations({ headers: await headers() }));

export const getActiveOrganization = cache(async () => auth.api.getFullOrganization({ headers: await headers() }));
