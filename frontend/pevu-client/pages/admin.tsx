import React from 'react';
import Link from 'next/link';
import { useAuth } from '../store/auth';

export default function AdminPanel() {
  const user = useAuth((s) => s.user);

  if (!user || user.role !== 'ADMIN') {
    return <div className="p-8 text-red-600">Access denied. Admins only.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/admin/products" className="text-blue-600 underline">Product Moderation</Link>
        </li>
        <li>
          <Link href="/admin/comments" className="text-blue-600 underline">Comment Moderation</Link>
        </li>
        <li>
          <Link href="/admin/sellers" className="text-blue-600 underline">Seller Moderation</Link>
        </li>
      </ul>
    </div>
  );
} 