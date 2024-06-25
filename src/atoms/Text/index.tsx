import React from "react";

interface TextProps {
  Tag?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  children: React.ReactNode;
}

const Text = ({ Tag = "span", className, children }: TextProps) => {
  const tagStyles = {
    span: "sm:text-sm",
    h1: "font-semibold text-gray-700 text-2xl",
    h2: "font-semibold text-gray-700 text-xl",
    h3: "font-semibold text-gray-600 text-lg",
    h4: "text-gray-500 sm:text-lg text-base",
    p: "tracking-wide",
  };

  return <Tag className={`${tagStyles[Tag]} ${className}`}>{children}</Tag>;
};

export default Text;
