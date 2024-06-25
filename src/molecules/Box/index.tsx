import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const boxVariants = cva("gap-4 rounded", {
  variants: {
    variant: {
      default: "bg-white text-gray-700 p-4",
    },
  },
});

interface BoxProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof boxVariants> {
  children: React.ReactNode;
}

const Box = ({ variant, className, ...props }: BoxProps) => {
  return (
    <div className={cn(boxVariants({ variant, className }))} {...props}>
      {props.children}
    </div>
  );
};

export default Box;
