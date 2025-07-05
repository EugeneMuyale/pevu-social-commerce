import React from "react";

export function Badge({ children, className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold bg-gray-200 ${className}`} {...props}>{children}</span>;
} 