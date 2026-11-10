import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthBackground } from "@/features/auth/components/auth-background";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate flex min-h-svh flex-col">
      <AuthBackground />
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>-
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-16">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
