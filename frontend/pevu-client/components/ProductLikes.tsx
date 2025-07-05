import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { likeProduct, getLikeCounts, LikeType } from '../api/social';
import { useAuth } from '../store/auth';
import toast from 'react-hot-toast';

interface ProductLikesProps {
  productId: number;
}

export default function ProductLikes({ productId }: ProductLikesProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: likeCounts, isLoading } = useQuery({
    queryKey: ['likeCounts', productId],
    queryFn: () => getLikeCounts(productId),
  });

  const likeMutation = useMutation({
    mutationFn: ({ type }: { type: LikeType }) => likeProduct(productId, user!.id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likeCounts', productId] });
      toast.success('Reaction updated!');
    },
    onError: () => {
      toast.error('Failed to update reaction');
    },
  });

  const handleLike = () => {
    if (!user) {
      toast.error('Please login to like products');
      return;
    }
    likeMutation.mutate({ type: 'LIKE' });
  };

  const handleDislike = () => {
    if (!user) {
      toast.error('Please login to dislike products');
      return;
    }
    likeMutation.mutate({ type: 'DISLIKE' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4 animate-pulse">
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleLike}
        disabled={likeMutation.isPending}
        className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">{likeCounts?.likes || 0}</span>
      </button>

      <button
        onClick={handleDislike}
        disabled={likeMutation.isPending}
        className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">{likeCounts?.dislikes || 0}</span>
      </button>
    </div>
  );
} 