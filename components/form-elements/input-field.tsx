import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type InputTypes = {
  label?: string | null;
  placeholder?: string | undefined;
  field: React.RefAttributes<HTMLInputElement>;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  inputClassName?: string;
  wrapperClassName?: string;
  required?: boolean;
  attributes?: React.InputHTMLAttributes<HTMLInputElement>;
};

function InputField({
  label,
  placeholder,
  field,
  disabled = false,
  type = "text",
  inputClassName,
  wrapperClassName,
  required = true,
  attributes,
}: InputTypes) {
  return (
    <FormItem
      className={`${wrapperClassName != undefined ? wrapperClassName : ""}`}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input
          {...field}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          className={`${inputClassName != undefined ? inputClassName : ""}`}
          required={required}
          {...attributes}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default InputField;
