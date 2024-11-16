import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "../ui/alert";

type ServerErrorAlertProps = {
  errors: Error | any[] | null;
  className?: string;
};

function ServerErrorAlert({ errors, className }: ServerErrorAlertProps) {
  const alertClasses = cn("", className);

  const errorList = Array.isArray(errors)
    ? errors.map((error, index) => (
        <li key={index} className="text-sm">
          {error}
        </li>
      ))
    : null;

  if (
    errors == null ||
    (typeof errors === "object" && errors instanceof Error)
  ) {
    return (
      <Alert variant="destructive" className={alertClasses}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <ul>
            <li>Unexpected error occurred!</li>
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive" className={alertClasses}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <ul>{errorList}</ul>
      </AlertDescription>
    </Alert>
  );
}

export default ServerErrorAlert;
