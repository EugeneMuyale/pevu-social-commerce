import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getUserStats, getFollowers, getFollowing } from '../../api/social';
import { useAuth } from '../../store/auth';
import FollowButton from '../../components/FollowButton';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const { user: currentUser } = useAuth();

  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats', id],
    queryFn: () => getUserStats(Number(id)),
    enabled: !!id,
  });

  const { data: followers = [], isLoading: followersLoading } = useQuery({
    queryKey: ['followers', id],
    queryFn: () => getFollowers(Number(id)),
    enabled: !!id,
  });

  const { data: following = [], isLoading: followingLoading } = useQuery({
    queryKey: ['following', id],
    queryFn: () => getFollowing(Number(id)),
    enabled: !!id,
  });

  if (!id) return <div className="p-8">User ID required</div>;
  if (statsLoading) return <div className="p-8">Loading user profile...</div>;

  const userId = Number(id);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow">
      {/* User Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {userId.toString().slice(-2)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">User {userId}</h1>
            <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
          </div>
        </div>
        
        {currentUser && currentUser.id !== userId && (
          <FollowButton targetUserId={userId} className="px-6 py-3" />
        )}
      </div>

      {/* User Stats */}
      {userStats && (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{userStats.followersCount}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{userStats.followingCount}</div>
            <div className="text-sm text-gray-600">Following</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
        </div>
      )}

      {/* Followers and Following Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Followers */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Followers ({followers.length})
          </h3>
          {followersLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : followers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No followers yet</p>
          ) : (
            <div className="space-y-3">
              {followers.slice(0, 10).map((follow) => (
                <div key={follow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {follow.followerId.toString().slice(-2)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">User {follow.followerId}</div>
                      <div className="text-sm text-gray-500">
                        Following since {new Date(follow.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {currentUser && currentUser.id !== follow.followerId && (
                    <FollowButton targetUserId={follow.followerId} className="px-3 py-1 text-sm" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Following */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Following ({following.length})
          </h3>
          {followingLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : following.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Not following anyone yet</p>
          ) : (
            <div className="space-y-3">
              {following.slice(0, 10).map((follow) => (
                <div key={follow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {follow.followingId.toString().slice(-2)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">User {follow.followingId}</div>
                      <div className="text-sm text-gray-500">
                        Following since {new Date(follow.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {currentUser && currentUser.id !== follow.followingId && (
                    <FollowButton targetUserId={follow.followingId} className="px-3 py-1 text-sm" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 