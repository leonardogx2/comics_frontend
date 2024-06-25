import { cn } from "@/lib/utils";
import React from "react";

interface SkeletonBoxProps extends React.ComponentProps<"div"> {}

const SkeletonBox = (props: SkeletonBoxProps) => {
  const { className, ...rest } = props;
  return (
    <div className={cn("animate-pulse bg-gray-200", className)} {...rest}></div>
  );
};

export default SkeletonBox;
