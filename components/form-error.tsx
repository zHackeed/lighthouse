import { CircleAlertIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

/** Form-level error (e.g. wrong credentials). Field errors use <FieldError>. `notice` is for non-errors. */
export function FormError({ message, notice = false }: { message: string | null; notice?: boolean }) {
  if (!message) return null;
  return (
    <Alert variant={notice ? "warning" : "destructive"} role={notice ? "status" : "alert"}>
      {notice ? <InfoIcon /> : <CircleAlertIcon />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
