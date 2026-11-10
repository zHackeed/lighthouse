import { requireSession } from "@/lib/session";
import { PasskeysCard } from "@/features/security/components/passkeys-card";
import { TwoFactorCard } from "@/features/security/components/two-factor-card";

export async function SecuritySettings() {
  const { user } = await requireSession();

  return (
    <>
      <TwoFactorCard enabled={!!user.twoFactorEnabled} />
      <PasskeysCard />
    </>
  );
}
