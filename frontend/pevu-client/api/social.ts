import api from './axios';

export type LikeType = 'LIKE' | 'DISLIKE';

export type LikeCountResponse = {
  productId: number;
  likes: number;
  dislikes: number;
};

export type Comment = {
  id: number;
  productId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: number; // For replies
  likes: number;
  dislikes: number;
  userLiked?: boolean;
  userDisliked?: boolean;
  replies?: Comment[];
  isEdited?: boolean;
};

export type CommentRequest = {
  productId: number;
  userId: number;
  content: string;
  parentId?: number; // For replies
};

export type CommentLikeRequest = {
  commentId: number;
  userId: number;
  type: 'LIKE' | 'DISLIKE';
};

export type CommentUpdateRequest = {
  commentId: number;
  userId: number;
  content: string;
};

export async function likeProduct(productId: number, userId: number, type: LikeType): Promise<void> {
  await api.post('/social/like', { productId, userId, type });
}

export async function getLikeCounts(productId: number): Promise<LikeCountResponse> {
  const res = await api.get<LikeCountResponse>(`/social/likes/${productId}`);
  return res.data;
}

export async function commentOnProduct(req: CommentRequest): Promise<Comment> {
  const res = await api.post<Comment>('/social/comment', req);
  return res.data;
}

export async function getComments(productId: number): Promise<Comment[]> {
  const res = await api.get<Comment[]>(`/social/comments/${productId}`);
  return res.data;
}

export async function getAllCommentsAdmin() {
  const res = await api.get('/social/comments/all'); // You may need to add this endpoint
  return res.data;
}

export async function flagComment(id: number) {
  const res = await api.put(`/social/comment/${id}/flag`);
  return res.data;
}

export async function unflagComment(id: number) {
  const res = await api.put(`/social/comment/${id}/unflag`);
  return res.data;
}

export async function deleteComment(id: number) {
  const res = await api.put(`/social/comment/${id}/delete`);
  return res.data;
}

export async function restoreComment(id: number) {
  const res = await api.put(`/social/comment/${id}/restore`);
  return res.data;
}

// Enhanced comment functionality
export async function likeComment(commentId: number, userId: number, type: 'LIKE' | 'DISLIKE'): Promise<void> {
  await api.post('/social/comment/like', { commentId, userId, type });
}

export async function getCommentLikes(commentId: number): Promise<{ likes: number; dislikes: number; userLiked?: boolean; userDisliked?: boolean }> {
  const res = await api.get(`/social/comment/${commentId}/likes`);
  return res.data;
}

export async function replyToComment(req: CommentRequest): Promise<Comment> {
  const res = await api.post<Comment>('/social/comment/reply', req);
  return res.data;
}

export async function updateComment(req: CommentUpdateRequest): Promise<Comment> {
  const res = await api.put<Comment>(`/social/comment/${req.commentId}`, req);
  return res.data;
}

export async function deleteUserComment(commentId: number, userId: number): Promise<void> {
  await api.delete(`/social/comment/${commentId}?userId=${userId}`);
}

// Follow/Unfollow API
export interface FollowRequest {
  followerId: number;
  followingId: number;
}

export interface FollowResponse {
  id: number;
  followerId: number;
  followingId: number;
  createdAt: string;
}

export interface UserStatsResponse {
  userId: number;
  followersCount: number;
  followingCount: number;
}

export const followUser = async (followerId: number, followingId: number): Promise<FollowResponse> => {
  const response = await api.post('/social/follows', { followerId, followingId });
  return response.data;
};

export const unfollowUser = async (followerId: number, followingId: number): Promise<void> => {
  await api.delete(`/social/follows/${followerId}/${followingId}`);
};

export const getFollowers = async (userId: number): Promise<FollowResponse[]> => {
  const response = await api.get(`/social/follows/followers/${userId}`);
  return response.data;
};

export const getFollowing = async (userId: number): Promise<FollowResponse[]> => {
  const response = await api.get(`/social/follows/following/${userId}`);
  return response.data;
};

export const getUserStats = async (userId: number): Promise<UserStatsResponse> => {
  const response = await api.get(`/social/follows/stats/${userId}`);
  return response.data;
};

export const checkIfFollowing = async (followerId: number, followingId: number): Promise<boolean> => {
  const response = await api.get(`/social/follows/check/${followerId}/${followingId}`);
  return response.data;
};

// Messaging API
export interface MessageRequest {
  senderId: number;
  receiverId: number;
  content: string;
}

export interface MessageResponse {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ConversationResponse {
  messages: MessageResponse[];
  unreadCount: number;
}

export const sendMessage = async (request: MessageRequest): Promise<MessageResponse> => {
  const response = await api.post('/api/social/messages', request);
  return response.data;
};

export const getConversation = async (userId1: number, userId2: number): Promise<ConversationResponse> => {
  const response = await api.get(`/api/social/messages/conversation/${userId1}/${userId2}`);
  return response.data;
};

export const getUnreadMessages = async (userId: number): Promise<MessageResponse[]> => {
  const response = await api.get(`/api/social/messages/unread/${userId}`);
  return response.data;
};

export const getUnreadCount = async (userId: number): Promise<number> => {
  const response = await api.get(`/api/social/messages/unread-count/${userId}`);
  return response.data;
};

export const markAsRead = async (messageId: number): Promise<void> => {
  await api.put(`/api/social/messages/${messageId}/read`);
};

export const deleteMessage = async (messageId: number): Promise<void> => {
  await api.delete(`/api/social/messages/${messageId}`);
};

// Social Sharing API
export interface ShareRequest {
  userId: number;
  productId: number;
  platform: 'FACEBOOK' | 'TWITTER' | 'WHATSAPP' | 'INSTAGRAM' | 'TELEGRAM' | 'EMAIL' | 'COPY_LINK';
  shareUrl?: string;
}

export interface ShareResponse {
  id: number;
  userId: number;
  productId: number;
  platform: string;
  shareUrl?: string;
  createdAt: string;
}

export interface ShareStatsResponse {
  productId: number;
  totalShares: number;
  sharesByPlatform: Record<string, number>;
}

export const shareProduct = async (request: ShareRequest): Promise<ShareResponse> => {
  const response = await api.post('/api/social/shares', request);
  return response.data;
};

export const getProductShares = async (productId: number): Promise<ShareResponse[]> => {
  const response = await api.get(`/api/social/shares/product/${productId}`);
  return response.data;
};

export const getShareStats = async (productId: number): Promise<ShareStatsResponse> => {
  const response = await api.get(`/api/social/shares/stats/${productId}`);
  return response.data;
};

// Review Helpfulness API
export interface ReviewHelpfulnessRequest {
  reviewId: number;
  userId: number;
  isHelpful: boolean;
}

export interface ReviewHelpfulnessResponse {
  id: number;
  reviewId: number;
  userId: number;
  isHelpful: boolean;
  createdAt: string;
}

export interface ReviewHelpfulnessStatsResponse {
  reviewId: number;
  helpfulCount: number;
  notHelpfulCount: number;
  totalVotes: number;
}

export const voteReviewHelpfulness = async (request: ReviewHelpfulnessRequest): Promise<ReviewHelpfulnessResponse> => {
  const response = await api.post('/api/reviews/helpfulness', request);
  return response.data;
};

export const getReviewHelpfulnessStats = async (reviewId: number): Promise<ReviewHelpfulnessStatsResponse> => {
  const response = await api.get(`/api/reviews/helpfulness/${reviewId}`);
  return response.data;
};

// Review Media API
export interface ReviewMediaRequest {
  reviewId: number;
  mediaUrl: string;
  mediaType: 'PHOTO' | 'VIDEO';
  thumbnailUrl?: string;
}

export interface ReviewMediaResponse {
  id: number;
  reviewId: number;
  mediaUrl: string;
  mediaType: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export const addReviewMedia = async (request: ReviewMediaRequest): Promise<ReviewMediaResponse> => {
  const response = await api.post('/api/reviews/media', request);
  return response.data;
};

export const getReviewMedia = async (reviewId: number): Promise<ReviewMediaResponse[]> => {
  const response = await api.get(`/api/reviews/media/${reviewId}`);
  return response.data;
}; 