import { Suspense } from "react";
import { RedirectIfSignedIn } from "@/features/auth/components/redirect-if-signed-in";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense>
        <RedirectIfSignedIn />
      </Suspense>
    </>
  );
}
