import React from 'react';

interface ProductMediaProps {
  images?: string[];
  videos?: string[];
  title: string;
  className?: string;
}

export default function ProductMedia({ images, videos, title, className = "" }: ProductMediaProps) {
  return (
    <>
      {images && images.length > 0 ? (
        <img
          src={images[0]}
          alt={title}
          className={`w-full h-full object-cover rounded-lg ${className}`}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      ) : videos && videos.length > 0 ? (
        <video
          src={videos[0]}
          className={`w-full h-full object-cover rounded-lg ${className}`}
          muted
          loop
          controls
          onError={(e) => {
            const target = e.currentTarget as HTMLVideoElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const placeholder = document.createElement('div');
              placeholder.className = 'w-full h-full flex items-center justify-center text-gray-400 text-sm';
              placeholder.textContent = 'Video unavailable';
              parent.appendChild(placeholder);
            }
          }}
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-gray-400 text-sm ${className}`}>
          No Image
        </div>
      )}
    </>
  );
} 