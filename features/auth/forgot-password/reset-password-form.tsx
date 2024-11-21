import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as Zod from "zod";
import { InputField } from "@/components/form-elements";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";

const schema = Zod.object({
  token: Zod.string(),
  password: Zod.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: Zod.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords must match",
  path: ["password_confirmation"],
});

export default function ResetPasswordForm() {
  const form = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: "",
      password: "",
      password_confirmation: "",
    },
  });

  function submitHandler(data: Zod.infer<typeof schema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <InputField
              label="Reset Token"
              placeholder="Enter reset token"
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <InputField
              label="New Password"
              placeholder="Enter new password"
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <InputField
              label="Confirm Password"
              placeholder="Confirm new password"
              field={field}
            />
          )}
        />
        <div>
          <Button type="submit" size="sm" className="mt-4 w-full">
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
}
