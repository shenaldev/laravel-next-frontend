import { HTMLAttributes } from "react";
import { ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InputSelectProps = {
  field: ControllerRenderProps<any, any>;
  items: { name: string; value: string }[];
  label?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  attributes?: HTMLAttributes<HTMLSelectElement>;
};

function InputSelect({
  field,
  items,
  label,
  className,
  placeholder,
  required = true,
}: InputSelectProps) {
  return (
    <FormItem className={`${className != undefined ? className : ""}`}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
        required={required}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {items.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
}

export default InputSelect;
