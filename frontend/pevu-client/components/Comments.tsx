import React, { useState, useEffect } from "react";
import { Send, Heart, MessageCircle, Edit, Trash2, Reply, X, Check, ThumbsDown } from "lucide-react";
import { useAuth } from "../store/auth";
import { 
  getComments, 
  commentOnProduct, 
  Comment, 
  likeComment, 
  getCommentLikes,
  replyToComment,
  updateComment,
  deleteUserComment
} from "../api/social";
import toast from "react-hot-toast";

interface CommentsProps {
  productId: number;
}

interface CommentItemProps {
  comment: Comment;
  onUpdate: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  onReply: (parentId: number) => void;
  onLike: (commentId: number, type: 'LIKE' | 'DISLIKE') => void;
  currentUserId?: number;
  level?: number;
}

function CommentItem({ 
  comment, 
  onUpdate, 
  onDelete, 
  onReply, 
  onLike, 
  currentUserId,
  level = 0 
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleEdit = async () => {
    if (!editContent.trim()) return;
    
    try {
      setSubmitting(true);
      await updateComment({
        commentId: comment.id,
        userId: currentUserId!,
        content: editContent.trim()
      });
      onUpdate(comment.id, editContent.trim());
      setIsEditing(false);
      toast.success("Comment updated successfully!");
    } catch (error) {
      toast.error("Failed to update comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim() || !currentUserId) return;
    
    try {
      setSubmitting(true);
      await replyToComment({
        productId: comment.productId,
        userId: currentUserId,
        content: replyContent.trim(),
        parentId: comment.id
      });
      setReplyContent("");
      setIsReplying(false);
      toast.success("Reply posted successfully!");
      // Reload comments to show the new reply
      window.location.reload();
    } catch (error) {
      toast.error("Failed to post reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!currentUserId) return;
    
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      setSubmitting(true);
      await deleteUserComment(comment.id, currentUserId);
      onDelete(comment.id);
      toast.success("Comment deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (type: 'LIKE' | 'DISLIKE') => {
    if (!currentUserId) {
      toast.error("Please login to like/dislike comments");
      return;
    }
    
    try {
      await likeComment(comment.id, currentUserId, type);
      onLike(comment.id, type);
    } catch (error) {
      toast.error("Failed to update reaction");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
      
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        return `${diffInMinutes}m ago`;
      } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)}h ago`;
      } else {
        return date.toLocaleDateString();
      }
    } catch (error) {
      return 'Unknown date';
    }
  };

  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId;
  const maxLevel = 2; // Maximum nesting level for replies

  return (
    <div className={`bg-gray-50 p-4 rounded-lg ${level > 0 ? 'ml-8 border-l-2 border-purple-200' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">User #{comment.userId}</span>
          {comment.isEdited && (
            <span className="text-xs text-gray-500">(edited)</span>
          )}
        </div>
        <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
      </div>
      
      {isEditing ? (
        <div className="mb-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            disabled={submitting}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEdit}
              disabled={submitting || !editContent.trim()}
              className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              <Check className="h-3 w-3" />
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content);
              }}
              disabled={submitting}
              className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              <X className="h-3 w-3" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 mb-3">{comment.content}</p>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-4 text-sm">
        {/* Like/Dislike */}
        <button
          onClick={() => handleLike('LIKE')}
          className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
            comment.userLiked 
              ? 'text-red-600 bg-red-50' 
              : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          <Heart className={`h-4 w-4 ${comment.userLiked ? 'fill-current' : ''}`} />
          <span>{comment.likes}</span>
        </button>
        
        <button
          onClick={() => handleLike('DISLIKE')}
          className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
            comment.userDisliked 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          <ThumbsDown className={`h-4 w-4 ${comment.userDisliked ? 'fill-current' : ''}`} />
          <span>{comment.dislikes}</span>
        </button>

        {/* Reply */}
        {level < maxLevel && (
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
          >
            <Reply className="h-4 w-4" />
            Reply
          </button>
        )}

        {/* Edit */}
        {canEdit && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
        )}

        {/* Delete */}
        {canDelete && (
          <button
            onClick={handleDelete}
            disabled={submitting}
            className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        )}
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="mt-3 p-3 bg-white rounded-md border border-gray-200">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={2}
            disabled={submitting}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleReply}
              disabled={submitting || !replyContent.trim()}
              className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              <Send className="h-3 w-3" />
              Reply
            </button>
            <button
              onClick={() => {
                setIsReplying(false);
                setReplyContent("");
              }}
              disabled={submitting}
              className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              <X className="h-3 w-3" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onReply={onReply}
              onLike={onLike}
              currentUserId={currentUserId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Comments({ productId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (productId) {
      loadComments();
    }
  }, [productId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(productId);
      setComments(data || []);
    } catch (error) {
      console.log('Failed to load comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to comment.");
      return;
    }
    if (!newComment.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      const comment = await commentOnProduct({
        productId,
        userId: user.id,
        content: newComment.trim()
      });
      
      setComments(prev => [comment, ...prev]);
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error('Failed to post comment:', error);
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateComment = (commentId: number, content: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, content, isEdited: true, updatedAt: new Date().toISOString() }
          : comment
      )
    );
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const handleReplyToComment = (parentId: number) => {
    // This will be handled by the individual comment components
  };

  const handleLikeComment = (commentId: number, type: 'LIKE' | 'DISLIKE') => {
    setComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          const newComment = { ...comment };
          if (type === 'LIKE') {
            if (comment.userLiked) {
              newComment.likes = Math.max(0, comment.likes - 1);
              newComment.userLiked = false;
            } else {
              newComment.likes = comment.likes + 1;
              newComment.userLiked = true;
              if (comment.userDisliked) {
                newComment.dislikes = Math.max(0, comment.dislikes - 1);
                newComment.userDisliked = false;
              }
            }
          } else {
            if (comment.userDisliked) {
              newComment.dislikes = Math.max(0, comment.dislikes - 1);
              newComment.userDisliked = false;
            } else {
              newComment.dislikes = comment.dislikes + 1;
              newComment.userDisliked = true;
              if (comment.userLiked) {
                newComment.likes = Math.max(0, comment.likes - 1);
                newComment.userLiked = false;
              }
            }
          }
          return newComment;
        }
        return comment;
      })
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments ({comments.length})</h3>
      
      {/* Comment Form */}
      {user && (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={!newComment.trim() || submitting}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {submitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center text-gray-500">No comments yet. Be the first to comment!</div>
        ) : (
          comments
            .filter(comment => !comment.parentId) // Only show top-level comments
            .map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onUpdate={handleUpdateComment}
                onDelete={handleDeleteComment}
                onReply={handleReplyToComment}
                onLike={handleLikeComment}
                currentUserId={user?.id}
              />
            ))
        )}
      </div>
    </div>
  );
} 