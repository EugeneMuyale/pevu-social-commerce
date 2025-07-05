import * as React from 'react';
import { useAuth, User } from '../../store/auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllCommentsAdmin, flagComment, unflagComment, deleteComment, restoreComment } from '../../api/social';
import toast from 'react-hot-toast';

// Mock data for scaffolding
const mockComments = [
  { id: 1, productId: 201, userId: 301, content: 'Nice product!', flagged: false, deleted: false },
  { id: 2, productId: 202, userId: 302, content: 'Spam comment', flagged: true, deleted: false },
  { id: 3, productId: 203, userId: 303, content: 'Offensive', flagged: true, deleted: true },
];

const AdminComments: React.FC = () => {
  const user = useAuth((s: { user: User | null }) => s.user);
  const queryClient = useQueryClient();
  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['admin-comments'],
    queryFn: getAllCommentsAdmin,
    enabled: !!user && user.role === 'ADMIN',
  });

  const flagMutation = useMutation({
    mutationFn: flagComment,
    onSuccess: () => {
      toast.success('Comment flagged');
      queryClient.invalidateQueries(['admin-comments']);
    },
    onError: () => toast.error('Failed to flag'),
  });
  const unflagMutation = useMutation({
    mutationFn: unflagComment,
    onSuccess: () => {
      toast.success('Comment unflagged');
      queryClient.invalidateQueries(['admin-comments']);
    },
    onError: () => toast.error('Failed to unflag'),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success('Comment deleted');
      queryClient.invalidateQueries(['admin-comments']);
    },
    onError: () => toast.error('Failed to delete'),
  });
  const restoreMutation = useMutation({
    mutationFn: restoreComment,
    onSuccess: () => {
      toast.success('Comment restored');
      queryClient.invalidateQueries(['admin-comments']);
    },
    onError: () => toast.error('Failed to restore'),
  });

  if (!user || user.role !== 'ADMIN') {
    return <div className="p-8 text-red-600">Access denied. Admins only.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Comment Moderation</h2>
      {isLoading && <div>Loading...</div>}
      {error !== null && error !== undefined && <div className="text-red-600">Failed to load comments</div>}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Product ID</th>
            <th className="p-2">User ID</th>
            <th className="p-2">Content</th>
            <th className="p-2">Flagged</th>
            <th className="p-2">Deleted</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments?.map((c: any) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.id}</td>
              <td className="p-2">{c.productId}</td>
              <td className="p-2">{c.userId}</td>
              <td className="p-2">{c.content}</td>
              <td className="p-2">{c.isFlagged ? 'Yes' : 'No'}</td>
              <td className="p-2">{c.isDeleted ? 'Yes' : 'No'}</td>
              <td className="p-2 space-x-2">
                <button className="bg-yellow-600 text-white px-2 py-1 rounded" onClick={() => flagMutation.mutate(c.id)} disabled={flagMutation.isLoading}>Flag</button>
                <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => unflagMutation.mutate(c.id)} disabled={unflagMutation.isLoading}>Unflag</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => deleteMutation.mutate(c.id)} disabled={deleteMutation.isLoading}>Delete</button>
                <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => restoreMutation.mutate(c.id)} disabled={restoreMutation.isLoading}>Restore</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminComments; 