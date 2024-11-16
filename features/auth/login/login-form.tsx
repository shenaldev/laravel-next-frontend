"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Zod from "zod";
import { InputField } from "@/components/form-elements";
import ServerErrorAlert from "@/components/ui-elements/server-error-alert";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import useAuth from "@/hooks/use-auth";
import useFetchCsrfCookie from "@/hooks/use-fetch-csrf-cookie";
import getServerErrorsArray from "@/lib/api-errors-handler";
import { authUrls } from "@/lib/api-urls";
import { ApiErrorResponse } from "@/types/axios";

const schema = Zod.object({
  email: Zod.string().email("Invalid email address"),
  password: Zod.string(),
}).required();

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string[] | null>(null);

  const form = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useFetchCsrfCookie();

  const { mutateAsync, isPending, status } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: Zod.infer<typeof schema>) => {
      return login(data, authUrls.login);
    },
    onError: (error: ApiErrorResponse) => {
      const err = getServerErrorsArray(error, true);
      setServerError(err);
    },
  });

  function submitHandler(data: Zod.infer<typeof schema>) {
    router.replace("/auth/login");
    mutateAsync(data);
  }

  return (
    <Form {...form}>
      {status === "error" && (
        <ServerErrorAlert className="mb-4" errors={serverError} />
      )}
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputField
              label="Email"
              field={field}
              placeholder="Enter your email"
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
        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
