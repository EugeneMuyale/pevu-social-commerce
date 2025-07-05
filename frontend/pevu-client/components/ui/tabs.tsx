import React, { useState, createContext, useContext } from "react";

const TabsContext = createContext<any>(null);

export function Tabs({ value, onValueChange, children, className = "" }: any) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }: any) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, className = "", ...props }: any) {
  const ctx = useContext(TabsContext);
  return (
    <button
      className={className}
      aria-selected={ctx.value === value}
      onClick={() => ctx.onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }: any) {
  const ctx = useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
} 