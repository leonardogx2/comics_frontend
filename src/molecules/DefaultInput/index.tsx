import InputError from "@/atoms/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { forwardRef } from "react";
import { IconType } from "react-icons";

interface DefaultInputProps extends React.ComponentProps<"input"> {
  label?: string;
  Icon?: IconType;
  error?: string;
}

const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  ({ label, error, Icon, ...props }, ref) => {
    return (
      <div className={`relative flex flex-col gap-1`}>
        {label && <Label>{label}</Label>}
        {Icon && (
          <Icon className="absolute top-[50%] ml-2 text-lg text-gray-400" />
        )}
        <Input
          className={`${Icon && "pl-8"} ${error && "border-red-500"}`}
          ref={ref}
          {...props}
        />
        <InputError>{error}</InputError>
      </div>
    );
  },
);

DefaultInput.displayName = "DefaultInput";

export default DefaultInput;
