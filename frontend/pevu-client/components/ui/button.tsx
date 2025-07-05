import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-sm hover:shadow-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
  outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
  danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
  success: "bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
  warning: "bg-yellow-600 hover:bg-yellow-700 text-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm font-medium rounded-md",
  md: "px-4 py-2 text-base font-medium rounded-lg",
  lg: "px-6 py-3 text-lg font-medium rounded-lg",
  icon: "p-2 rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = "", 
    variant = "primary", 
    size = "md", 
    loading = false,
    icon,
    children,
    disabled,
    ...props 
  }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant] || ""} 
        ${sizeClasses[size] || ""} 
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button"; 