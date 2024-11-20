"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as Zod from "zod";
import { InputField } from "@/components/form-elements";
import ServerErrorAlert from "@/components/ui-elements/server-error-alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import getServerErrorsArray from "@/lib/api-errors-handler";
import { authUrls } from "@/lib/api-urls";
import { axiosCall } from "@/lib/axios";
import { ApiErrorResponse } from "@/types/axios";

const schema = Zod.object({
  code: Zod.string(),
}).required();

type EmailVerificationDialogProps = {
  open: boolean;
  email: string;
  setOpen: (isOpen: boolean) => void;
  setIsMailVerified: (isMailVerified: boolean) => void;
};

function EmailVerificationDialog({
  open,
  email,
  setOpen,
  setIsMailVerified,
}: EmailVerificationDialogProps) {
  const [serverError, setServerError] = useState<string[] | null>(null);
  const form = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const { mutateAsync, isPending, status } = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: async (data: Zod.infer<typeof schema>) => {
      return axiosCall({
        method: "POST",
        urlPath: authUrls.verifyCode,
        data: {
          email: email,
          code: data.code,
        },
      });
    },
    onSuccess: () => {
      setIsMailVerified(true);
      setOpen(false);
      toast.success("Email Verification success!");
    },
    onError: (error: ApiErrorResponse) => {
      const err = getServerErrorsArray(error, true);
      setServerError(err);
    },
  });

  function submitHandler(data: Zod.infer<typeof schema>) {
    mutateAsync(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-h-60">
        <DialogHeader>
          <DialogTitle>Verify Your Email</DialogTitle>
          <DialogDescription>
            We've sent a verification code to your email. Please enter it below
            to complete your registration.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className="flex flex-col items-end justify-center gap-4 md:flex-row">
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <InputField
                    label="Verification Code"
                    wrapperClassName="max-w-[300px] w-full"
                    field={field}
                  />
                )}
              />
              <Button disabled={isPending} size="sm">
                {isPending ? "Verifying" : "Verify"}
              </Button>
            </div>
          </form>
          {status === "error" && (
            <ServerErrorAlert className="mb-4" errors={serverError} />
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EmailVerificationDialog;
