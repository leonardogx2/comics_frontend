import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import Box from "../Box";
import InputError from "@/atoms/InputError";

interface DefaultRadioProps {
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
  defaultValue?: string;
  error?: string;
}

const DefaultRadio = ({
  options,
  onValueChange,
  defaultValue,
  error,
}: DefaultRadioProps) => {
  return (
    <RadioGroup onValueChange={onValueChange} defaultValue={defaultValue}>
      {options.map((option) => {
        return (
          <Box key={option.value} className="flex">
            <RadioGroupItem value={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </Box>
        );
      })}
      <InputError>{error}</InputError>
    </RadioGroup>
  );
};

export default DefaultRadio;
