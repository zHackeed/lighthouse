import { Spinner } from "@/components/ui/spinner";

/** Suspense fallback for page content that waits on the session. */
export function PageLoading() {
  return (
    <div role="status" className="flex justify-center py-16 text-muted-foreground">
      <Spinner className="size-5" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
