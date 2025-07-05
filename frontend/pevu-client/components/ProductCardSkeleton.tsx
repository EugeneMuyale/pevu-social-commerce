import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-white">
      {/* Media Skeleton */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <div className="w-full h-full bg-gray-200 animate-pulse"></div>
      </div>

      {/* Content Skeleton */}
      <CardContent className="p-4">
        {/* Seller Info Skeleton */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="w-8 h-3 bg-gray-200 rounded animate-pulse ml-1"></div>
        </div>

        {/* Price Skeleton */}
        <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-2/3 h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Category Skeleton */}
        <div className="flex space-x-2 mb-3">
          <div className="w-16 h-5 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-20 h-5 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="px-4 pb-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            {/* Social Actions Skeleton */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-6 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Button Skeleton */}
          <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </CardFooter>
    </Card>
  );
} 