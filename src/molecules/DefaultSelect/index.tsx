import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import InputError from "@/atoms/InputError";

interface DefaultSelectProps {
  label: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  error?: string;
  defaultValue?: string | number;
  onValueChange: (value: string) => void;
}

export const DefaultSelect = React.forwardRef<
  HTMLDivElement,
  DefaultSelectProps
>(
  (
    { label, options, placeholder, error, onValueChange, defaultValue },
    ref,
  ) => {
    return (
      <div ref={ref} className="relative flex flex-col gap-1">
        <Label>{label}</Label>
        <Select defaultValue={defaultValue + ""} onValueChange={onValueChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <InputError>{error}</InputError>
      </div>
    );
  },
);

DefaultSelect.displayName = "DefaultSelect";
