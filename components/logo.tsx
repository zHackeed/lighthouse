import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-md bg-foreground text-sm font-bold text-background"
      >
        {site.name[0]}
      </span>
      <span className="text-lg font-semibold tracking-tight">{site.name}</span>
    </span>
  );
}
