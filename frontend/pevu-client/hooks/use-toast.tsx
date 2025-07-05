import React, { createContext, useContext } from "react";

type ToastContextType = {
  toast: (opts: { title: string; description?: string }) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  // For demonstration, just use alert
  const toast = ({ title, description }: { title: string; description?: string }) => {
    alert(title + (description ? `\n${description}` : ""));
  };
  return <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

// For direct import usage
export const toast = ({ title, description }: { title: string; description?: string }) => {
  alert(title + (description ? `\n${description}` : ""));
}; 