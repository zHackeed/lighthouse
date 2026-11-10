import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { ConsoleNav } from "@/features/console/components/console-nav";
import { ConsoleNavigation } from "@/features/console/components/console-navigation";
import { OrganizationSwitcher } from "@/features/organizations/components/organization-switcher";

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-4 sm:px-6">
        <Link href="/" aria-label="Overview">
          <Logo />
        </Link>
        <Suspense>
          <OrganizationSwitcher />
        </Suspense>
        <Suspense fallback={<ConsoleNav showAdmin={false} />}>
          <ConsoleNavigation />
        </Suspense>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
