import * as React from 'react';
import { useAuth, User } from '../../store/auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllSellers, verifySeller, rejectSeller, suspendUser, unsuspendUser } from '../../api/profile';
import toast from 'react-hot-toast';

// Mock data for scaffolding
const mockSellers = [
  { id: 101, name: 'Alice', email: 'alice@example.com', verified: false, suspended: false },
  { id: 102, name: 'Bob', email: 'bob@example.com', verified: true, suspended: false },
  { id: 103, name: 'Carol', email: 'carol@example.com', verified: false, suspended: true },
];

const AdminSellers: React.FC = () => {
  const user = useAuth((s: { user: User | null }) => s.user);
  const queryClient = useQueryClient();
  const { data: sellers, isLoading, error } = useQuery({
    queryKey: ['admin-sellers'],
    queryFn: getAllSellers,
    enabled: !!user && user.role === 'ADMIN',
  });

  const verifyMutation = useMutation({
    mutationFn: verifySeller,
    onSuccess: () => {
      toast.success('Seller verified');
      queryClient.invalidateQueries(['admin-sellers']);
    },
    onError: () => toast.error('Failed to verify'),
  });
  const rejectMutation = useMutation({
    mutationFn: rejectSeller,
    onSuccess: () => {
      toast.success('Seller rejected');
      queryClient.invalidateQueries(['admin-sellers']);
    },
    onError: () => toast.error('Failed to reject'),
  });
  const suspendMutation = useMutation({
    mutationFn: suspendUser,
    onSuccess: () => {
      toast.success('Seller suspended');
      queryClient.invalidateQueries(['admin-sellers']);
    },
    onError: () => toast.error('Failed to suspend'),
  });
  const unsuspendMutation = useMutation({
    mutationFn: unsuspendUser,
    onSuccess: () => {
      toast.success('Seller unsuspended');
      queryClient.invalidateQueries(['admin-sellers']);
    },
    onError: () => toast.error('Failed to unsuspend'),
  });

  if (!user || user.role !== 'ADMIN') {
    return <div className="p-8 text-red-600">Access denied. Admins only.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Seller Moderation</h2>
      {isLoading && <div>Loading...</div>}
      {error !== null && error !== undefined && <div className="text-red-600">Failed to load sellers</div>}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Verified</th>
            <th className="p-2">Suspended</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers?.map((s: any) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.id}</td>
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">{s.businessDocStatus === 'APPROVED' ? 'Yes' : 'No'}</td>
              <td className="p-2">{s.isSuspended ? 'Yes' : 'No'}</td>
              <td className="p-2 space-x-2">
                <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => verifyMutation.mutate(s.id)} disabled={verifyMutation.isLoading}>Verify</button>
                <button className="bg-yellow-600 text-white px-2 py-1 rounded" onClick={() => rejectMutation.mutate(s.id)} disabled={rejectMutation.isLoading}>Reject</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => suspendMutation.mutate(s.id)} disabled={suspendMutation.isLoading}>Suspend</button>
                <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => unsuspendMutation.mutate(s.id)} disabled={unsuspendMutation.isLoading}>Unsuspend</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSellers; 