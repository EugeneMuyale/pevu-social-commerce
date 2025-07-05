import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser, unfollowUser, checkIfFollowing } from '../api/social';
import { useAuth } from '../store/auth';
import toast from 'react-hot-toast';

interface FollowButtonProps {
  targetUserId: number;
  className?: string;
}

export default function FollowButton({ targetUserId, className = '' }: FollowButtonProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: isFollowing = false, isLoading } = useQuery({
    queryKey: ['isFollowing', user?.id, targetUserId],
    queryFn: () => checkIfFollowing(user!.id, targetUserId),
    enabled: !!user && user.id !== targetUserId,
  });

  const followMutation = useMutation({
    mutationFn: () => followUser(user!.id, targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isFollowing', user?.id, targetUserId] });
      queryClient.invalidateQueries({ queryKey: ['userStats', targetUserId] });
      toast.success('You are now following this user!');
    },
    onError: () => {
      toast.error('Failed to follow user');
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(user!.id, targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isFollowing', user?.id, targetUserId] });
      queryClient.invalidateQueries({ queryKey: ['userStats', targetUserId] });
      toast.success('You have unfollowed this user');
    },
    onError: () => {
      toast.error('Failed to unfollow user');
    },
  });

  const handleFollowToggle = () => {
    if (!user) {
      toast.error('Please login to follow users');
      return;
    }

    if (user.id === targetUserId) {
      toast.error('You cannot follow yourself');
      return;
    }

    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  // Don't show follow button if user is not logged in or trying to follow themselves
  if (!user || user.id === targetUserId) {
    return null;
  }

  if (isLoading) {
    return (
      <button
        disabled
        className={`px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed ${className}`}
      >
        Loading...
      </button>
    );
  }

  const isPending = followMutation.isPending || unfollowMutation.isPending;

  return (
    <button
      onClick={handleFollowToggle}
      disabled={isPending}
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        isFollowing
          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } ${className}`}
    >
      {isPending ? 'Updating...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
} 