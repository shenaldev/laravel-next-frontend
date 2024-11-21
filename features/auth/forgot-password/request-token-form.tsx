import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as Zod from "zod";
import { InputField } from "@/components/form-elements";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";

const schema = Zod.object({
  email: Zod.string().email(),
}).required();

type RequestTokenFormProps = {
  setStep: (step: "request" | "reset") => void;
};

export default function RequestTokenForm({ setStep }: RequestTokenFormProps) {
  const form = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  function submitHandler(data: Zod.infer<typeof schema>) {
    console.log(data);
    setStep("reset");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputField
              label="Email Address"
              placeholder="Enter your email"
              field={field}
            />
          )}
        />
        <Button type="submit" className="w-full" size="sm">
          Request Reset Token
        </Button>
      </form>
    </Form>
  );
}
