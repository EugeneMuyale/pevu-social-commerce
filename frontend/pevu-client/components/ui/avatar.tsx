import React from "react";

export function Avatar({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`inline-block rounded-full overflow-hidden bg-gray-100 ${className}`} {...props}>{children}</div>;
}

export function AvatarImage({ src, alt, className = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} {...props} />;
}

export function AvatarFallback({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex items-center justify-center w-full h-full bg-gray-300 text-white ${className}`} {...props}>{children}</div>;
} 