"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RequestTokenForm from "./request-token-form";
import ResetPasswordForm from "./reset-password-form";

export default function ForgotPasswordCard() {
  const [step, setStep] = useState<"request" | "reset">("request");

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            {step === "request"
              ? "Enter your email to receive a password reset token."
              : "Enter the token you received and your new password."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "request" ? (
            <RequestTokenForm setStep={setStep} />
          ) : (
            <ResetPasswordForm />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
