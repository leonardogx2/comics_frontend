import React from "react";

interface InputErrorProps {
  children: React.ReactNode;
  className?: string;
}

const InputError = ({ children, className }: InputErrorProps) => {
  return (
    <span className={`absolute -bottom-5 text-sm text-red-400 ${className}`}>
      {children}
    </span>
  );
};

export default InputError;
