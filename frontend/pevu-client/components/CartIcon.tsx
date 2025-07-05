import React from 'react';
import Link from 'next/link';
import { useCart } from '../store/cart';

export default function CartIcon() {
  const totalCount = useCart((s) => s.getTotalCartCount());
  return (
    <Link href="/cart" className="flex items-center space-x-1 text-gray-800 hover:text-gray-600 transition-colors" aria-label="Cart">
      <div className="relative inline-block">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lg">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1 py-0.5 border border-white">
            {totalCount}
          </span>
        )}
      </div>
      <span className="text-sm font-medium">Cart</span>
    </Link>
  );
} 