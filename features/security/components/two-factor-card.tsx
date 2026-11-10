import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DisableTwoFactorForm } from "@/features/security/components/disable-two-factor-form";
import { EnableTwoFactorForm } from "@/features/security/components/enable-two-factor-form";

export function TwoFactorCard({ enabled }: { enabled: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-factor authentication</CardTitle>
        <CardDescription>
          {enabled
            ? "On. Sign-in asks for a code from your authenticator app."
            : "Off. Add a code from an authenticator app to every sign-in."}
        </CardDescription>
      </CardHeader>
      <CardContent>{enabled ? <DisableTwoFactorForm /> : <EnableTwoFactorForm />}</CardContent>
    </Card>
  );
}
