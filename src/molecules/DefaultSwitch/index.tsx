import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { forwardRef } from "react";

interface DefaultSwitchProps extends React.ComponentProps<"button"> {
  label?: string;
  horizontal?: boolean;
  onCheckedChange?: (value: boolean) => void;
}

const DefaultSwitch = forwardRef<HTMLButtonElement, DefaultSwitchProps>(
  ({ label, horizontal, onCheckedChange, ...props }, ref) => {
    return (
      <div
        className={`relative flex ${horizontal ? "flex-row-reverse items-center gap-2 self-start" : "flex-col gap-1"}`}
      >
        {label && <Label>{label}</Label>}
        <Switch onCheckedChange={onCheckedChange} ref={ref} {...props} />
      </div>
    );
  },
);

DefaultSwitch.displayName = "DefaultSwitch";

export default DefaultSwitch;
