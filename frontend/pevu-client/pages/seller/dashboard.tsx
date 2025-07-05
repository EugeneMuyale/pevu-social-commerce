import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../store/auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsBySeller, deleteProduct, Product } from '../../api/products';

export default function SellerDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['seller-products', user?.id],
    queryFn: () => getProductsBySeller(user!.id),
    enabled: !!user && user.role === 'SELLER',
  });
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries(['seller-products', user?.id]),
  });

  if (!user || user.role !== 'SELLER') return <div className="p-8">Only sellers can access the dashboard.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Products</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/product-create" className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto text-center">+ Add Product</Link>
          <button className="bg-purple-600 text-white px-4 py-2 rounded w-full md:w-auto text-center">Analytics</button>
        </div>
      </div>
      
      {/* Products Table Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Products Table</h3>
        {isLoading && <div className="text-center py-4">Loading...</div>}
        {error !== null && error !== undefined && <div className="text-red-500 text-center py-4">Failed to load products</div>}
        {products && products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold text-gray-700 border-b">Title</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b">Category</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b">Price (Ksh)</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b">Created</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{product.title}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">Ksh {product.price}</td>
                    <td className="p-3">{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 space-x-2">
                      <Link href={`/seller/edit-product/${product.id}`} className="text-blue-600 hover:text-blue-800">Edit</Link>
                      <button
                        className="text-red-600 hover:text-red-800 ml-2"
                        onClick={() => mutation.mutate(product.id)}
                        disabled={mutation.isLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No products found. <Link href="/product-create" className="text-blue-600 hover:text-blue-800">Create your first product</Link>
          </div>
        )}
      </div>

      {/* Content Grid Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Your Content</h3>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div
              key={item}
              className="aspect-square bg-gray-100 border border-gray-200 rounded-md overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src="/placeholder.svg"
                alt={`Post ${item}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 