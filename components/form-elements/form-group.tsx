import React from "react";

import { cn } from "@/lib/utils";

type FormGroupProps = {
  children: React.ReactNode;
  className?: string;
};

const defaultClassNames = "grid gap-2 grid-cols-1 md:grid-cols-2";

const FormGroup = ({ children, className }: FormGroupProps) => {
  return <div className={cn(defaultClassNames, className)}>{children}</div>;
};
FormGroup.displayName = "FormGroup";

export default FormGroup;
