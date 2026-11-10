import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  description?: React.ReactNode;
  /** Small label on the right of the header, e.g. "step 1 of 2". */
  step?: string;
  backHref?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

export function AuthCard({ title, description, step, backHref, footer, children }: AuthCardProps) {
  return (
    <Card className="gap-0 py-0 shadow-xl">
      <div className="flex min-h-14 items-center gap-2 border-b bg-muted/40 px-6 has-[a]:pl-3">
        {backHref && (
          <Link href={backHref} aria-label="Back" className={buttonVariants({ variant: "ghost", size: "icon-sm" })}>
            <ArrowLeftIcon />
          </Link>
        )}
        <h1 className="flex-1 text-base font-medium">{title}</h1>
        {step && <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">{step}</span>}
      </div>
      <div className="flex flex-col gap-5 p-6">
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {children}
      </div>
      {footer && (
        <div className="flex justify-center gap-1.5 border-t bg-muted/40 px-6 py-3.5 text-sm">{footer}</div>
      )}
    </Card>
  );
}

export function AuthFooterLink({ prompt, href, children }: { prompt: string; href: string; children: React.ReactNode }) {
  return (
    <>
      <span className="text-muted-foreground">{prompt}</span>
      <Link href={href} className="font-medium underline underline-offset-4">
        {children}
      </Link>
    </>
  );
}
