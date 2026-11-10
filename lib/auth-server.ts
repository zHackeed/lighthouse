import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, organization, twoFactor } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";
import { db } from "@/db/connector";
import * as schema from "@/db/schema";
import { PENDING_ACTIVATION, PENDING_ACTIVATION_MESSAGE } from "@/lib/account-status";
import { site } from "@/lib/site";

export const auth = betterAuth({
    appName: site.name,
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    databaseHooks: {
        user: {
            create: {
                // Every new account starts disabled until an administrator activates it (unbans it).
                before: async (user) => ({ data: { ...user, banned: true, banReason: PENDING_ACTIVATION } }),
            },
        },
    },
    plugins: [
        twoFactor({ issuer: site.name }),
        passkey({ rpName: site.name }),
        organization(),
        admin({
            bannedUserMessage: (user) =>
                user.banReason === PENDING_ACTIVATION
                    ? PENDING_ACTIVATION_MESSAGE
                    : "This account has been disabled. Contact an administrator if you think this is a mistake.",
        }),
        nextCookies(),
    ],
});
