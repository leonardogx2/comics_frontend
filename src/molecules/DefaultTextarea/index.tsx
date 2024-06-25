import InputError from "@/atoms/InputError";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface DefaultTextareaProps extends React.ComponentProps<"textarea"> {
  label: string;
  error?: string;
}

const DefaultTextarea = React.forwardRef<
  HTMLTextAreaElement,
  DefaultTextareaProps
>(({ label, error, ...props }, ref) => {
  return (
    <div className="relative flex h-full flex-col gap-2">
      <Label>{label}</Label>
      <Textarea
        {...props}
        ref={ref}
        className={`h-full resize-none ${error && "border-red-500"}`}
      />
      <InputError>{error}</InputError>
    </div>
  );
});

DefaultTextarea.displayName = "DefaultTextarea";

export default DefaultTextarea;
