"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TokenExpiredAlert() {
  const searchParams = useSearchParams();
  const isUnauthenticated = searchParams.get("error") === "unauthorized";

  if (!isUnauthenticated) return null;

  return (
    <Alert variant="destructive" className="mb-4 py-2">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Session</AlertTitle>
      <AlertDescription className="text-sm">
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}
