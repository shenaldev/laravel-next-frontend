"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Zod from "zod";
import { InputField } from "@/components/form-elements";
import InputCheckbox from "@/components/form-elements/input-checkbox";
import ServerErrorAlert from "@/components/ui-elements/server-error-alert";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import useAuth from "@/hooks/use-auth";
import useFetchCsrfCookie from "@/hooks/use-fetch-csrf-cookie";
import getServerErrorsArray from "@/lib/api-errors-handler";
import { authUrls } from "@/lib/api-urls";
import { axiosCall } from "@/lib/axios";
import { ApiErrorResponse } from "@/types/axios";
import EmailVerificationDialog from "./email-verification-dialog";

const schema = Zod.object({
  name: Zod.string(),
  email: Zod.string().email("Invalid email address"),
  password: Zod.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: Zod.string(),
  agree_terms: Zod.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords must match",
  path: ["password_confirmation"],
});

export default function RegisterForm() {
  const { register } = useAuth();
  const [serverError, setServerError] = useState<string[] | null>(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [isMailVerifed, setIsMailVerified] = useState(false);

  const form = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      agree_terms: false,
    },
  });

  useFetchCsrfCookie();

  const { mutateAsync, isPending, status } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: Zod.infer<typeof schema>) => {
      return register(data, authUrls.register);
    },
    onError: (error: ApiErrorResponse) => {
      const err = getServerErrorsArray(error, true);
      setServerError(err);
    },
  });

  const sendEmail = useMutation({
    mutationKey: ["send-verification-email"],
    mutationFn: async (email: string) => {
      return axiosCall({
        method: "POST",
        urlPath: authUrls.sendVerificationMail,
        data: {
          email: email,
        },
      });
    },
  });

  function submitHandler(data: Zod.infer<typeof schema>) {
    if (!isMailVerifed) {
      sendEmail.mutateAsync(data.email);
      setModelOpen(true);
      return;
    }
    mutateAsync(data);
  }

  return (
    <>
      <Form {...form}>
        {status === "error" && (
          <ServerErrorAlert className="mb-4" errors={serverError} />
        )}
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <InputField
                label="Name"
                field={field}
                placeholder="Enter your name"
              />
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <InputField
                label="Email"
                field={field}
                placeholder="Enter your email"
                disabled={isMailVerifed}
              />
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <InputField
                label="Password"
                field={field}
                type="password"
                placeholder="Enter your password"
                attributes={{
                  autoComplete: "current-password",
                }}
              />
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <InputField
                label="Confirm Password"
                field={field}
                type="password"
                placeholder="Confirm your password"
                attributes={{
                  autoComplete: "current-password",
                }}
              />
            )}
          />

          <FormField
            control={form.control}
            name="agree_terms"
            render={({ field }) => (
              <InputCheckbox
                label="I agree to the terms and conditions"
                onCheckedChange={field.onChange}
                checked={field.value}
              />
            )}
          />

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sign Up..." : "Create An Account"}
            </Button>
          </div>
        </form>
      </Form>
      <EmailVerificationDialog
        open={modelOpen}
        email={form.getValues("email")}
        setOpen={setModelOpen}
        setIsMailVerified={setIsMailVerified}
      />
    </>
  );
}
