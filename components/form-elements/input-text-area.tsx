import { HTMLAttributes } from "react";
import { ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type InputTextAreaProps = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  attributes?: HTMLAttributes<HTMLTextAreaElement>;
};

function InputTextArea({
  field,
  label,
  placeholder,
  className,
  required = true,
  attributes,
}: InputTextAreaProps) {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea
          placeholder={placeholder}
          {...field}
          required={required}
          {...attributes}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default InputTextArea;
