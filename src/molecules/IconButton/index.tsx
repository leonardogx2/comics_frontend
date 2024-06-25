import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface IconButtonProps {
  Icon?: IconType;
  className?: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
}

const IconButton = ({
  Icon,
  onClick,
  className,
  size = "large",
}: IconButtonProps) => {
  return (
    <button
      className={cn([
        `${size === "large" ? "h-12 w-12 p-3" : size === "medium" ? "h-10 w-10 p-3" : "h-8 w-8 p-2"} cursor-pointer rounded-full bg-white shadow-lg duration-100 hover:scale-105`,
        className,
      ])}
      onClick={onClick}
    >
      {Icon ? (
        <Icon className="h-full w-full" />
      ) : (
        <AiOutlineLoading3Quarters className="h-full w-full animate-spin" />
      )}
    </button>
  );
};

export default IconButton;
