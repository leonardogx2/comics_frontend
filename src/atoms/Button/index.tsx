import React from "react";

interface ButtonProps {
  label: string | number;
  onClick?: () => void;
  className?: string;
}

const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`py-2 px-5 font-semibold rounded-lg text-lg ${className}`}
      onClick={onClick ? onClick : () => {}}
    >
      {label}
    </button>
  );
};

export default Button;
