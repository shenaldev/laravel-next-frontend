import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormItem, FormLabel } from "../ui/form";

type InputCheckboxTypes = {
  label: string;
  disabled?: boolean;
  required?: boolean;
  onCheckedChange: (checked: CheckedState) => void;
  checked: CheckedState | undefined;
  children?: React.ReactNode;
};

export default function InputCheckbox({
  label,
  onCheckedChange,
  checked,
  disabled = false,
  required = true,
  children,
}: InputCheckboxTypes) {
  return (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          disabled={disabled}
          required={required}
          onCheckedChange={onCheckedChange}
          checked={checked}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>{label}</FormLabel>
        {children}
      </div>
    </FormItem>
  );
}
