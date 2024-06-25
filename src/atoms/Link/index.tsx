import React from "react";
import { Link } from "react-router-dom";

interface DefaultLinkProps {
  to: string;
  children: React.ReactNode;
}

const DefaultLink = ({ to, children }: DefaultLinkProps) => {
  return (
    <Link className="font-semibold text-blue-500" to={to}>
      {children}
    </Link>
  );
};

export default DefaultLink;
