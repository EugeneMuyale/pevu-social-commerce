import * as React from 'react';
import { useAuth, User } from '../../store/auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllProductsAdmin, approveProduct, rejectProduct, removeProduct } from '../../api/products';
import toast from 'react-hot-toast';

// Mock data for scaffolding
const mockProducts = [
  { id: 1, title: 'Product A', sellerId: 101, approved: false, active: true },
  { id: 2, title: 'Product B', sellerId: 102, approved: true, active: true },
  { id: 3, title: 'Product C', sellerId: 103, approved: false, active: false },
];

const AdminProducts: React.FC = () => {
  const user = useAuth((s: { user: User | null }) => s.user);
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['admin-products'],
    queryFn: getAllProductsAdmin,
    enabled: !!user && user.role === 'ADMIN',
  });

  const approveMutation = useMutation({
    mutationFn: approveProduct,
    onSuccess: () => {
      toast.success('Product approved');
      queryClient.invalidateQueries(['admin-products']);
    },
    onError: () => toast.error('Failed to approve'),
  });
  const rejectMutation = useMutation({
    mutationFn: rejectProduct,
    onSuccess: () => {
      toast.success('Product rejected');
      queryClient.invalidateQueries(['admin-products']);
    },
    onError: () => toast.error('Failed to reject'),
  });
  const removeMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      toast.success('Product removed');
      queryClient.invalidateQueries(['admin-products']);
    },
    onError: () => toast.error('Failed to remove'),
  });

  if (!user || user.role !== 'ADMIN') {
    return <div className="p-8 text-red-600">Access denied. Admins only.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Product Moderation</h2>
      {isLoading && <div>Loading...</div>}
      {error !== null && error !== undefined && <div className="text-red-600">Failed to load products</div>}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Seller</th>
            <th className="p-2">Approved</th>
            <th className="p-2">Active</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((p: any) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.title}</td>
              <td className="p-2">{p.sellerId}</td>
              <td className="p-2">{p.isApproved ? 'Yes' : 'No'}</td>
              <td className="p-2">{p.isActive ? 'Yes' : 'No'}</td>
              <td className="p-2 space-x-2">
                <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => approveMutation.mutate(p.id)} disabled={approveMutation.isLoading}>Approve</button>
                <button className="bg-yellow-600 text-white px-2 py-1 rounded" onClick={() => rejectMutation.mutate(p.id)} disabled={rejectMutation.isLoading}>Reject</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => removeMutation.mutate(p.id)} disabled={removeMutation.isLoading}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts; 