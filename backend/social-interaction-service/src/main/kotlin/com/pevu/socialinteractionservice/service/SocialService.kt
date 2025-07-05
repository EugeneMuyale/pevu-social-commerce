package com.pevu.socialinteractionservice.service

import com.pevu.socialinteractionservice.dto.*
import com.pevu.socialinteractionservice.model.Comment
import com.pevu.socialinteractionservice.model.CommentLike
import com.pevu.socialinteractionservice.model.CommentLikeType
import com.pevu.socialinteractionservice.model.Like
import com.pevu.socialinteractionservice.model.LikeType
import com.pevu.socialinteractionservice.repository.CommentLikeRepository
import com.pevu.socialinteractionservice.repository.CommentRepository
import com.pevu.socialinteractionservice.repository.LikeRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.util.*

@Service
class SocialService(
    private val likeRepository: LikeRepository,
    private val commentRepository: CommentRepository,
    private val commentLikeRepository: CommentLikeRepository
) {
    @Transactional
    fun like(request: LikeRequest) {
        val existing = likeRepository.findByProductIdAndUserId(request.productId, request.userId)
        if (existing.isPresent) {
            val like = existing.get()
            if (like.type != request.type) {
                likeRepository.save(like.copy(type = request.type))
            }
        } else {
            likeRepository.save(
                Like(
                    productId = request.productId,
                    userId = request.userId,
                    type = request.type
                )
            )
        }
    }

    fun getLikeCounts(productId: Long): LikeCountResponse {
        val likes = likeRepository.countByProductIdAndType(productId, LikeType.LIKE)
        val dislikes = likeRepository.countByProductIdAndType(productId, LikeType.DISLIKE)
        return LikeCountResponse(productId, likes, dislikes)
    }

    @Transactional
    fun comment(request: CommentRequest): CommentResponse {
        val comment = Comment(
            productId = request.productId,
            userId = request.userId,
            content = request.content,
            parentId = request.parentId
        )
        return commentRepository.save(comment).toResponse()
    }

    fun getComments(productId: Long): List<CommentResponse> {
        val topLevelComments = commentRepository.findByProductIdAndIsDeletedFalse(productId)
            .filter { it.parentId == null }
        
        return topLevelComments.map { comment ->
            val replies = commentRepository.findByParentIdAndIsDeletedFalse(comment.id)
            comment.toResponse().copy(replies = replies.map { it.toResponse() })
        }
    }

    @Transactional
    fun likeComment(commentId: Long, userId: Long, type: CommentLikeType) {
        val existing = commentLikeRepository.findByCommentIdAndUserId(commentId, userId)
        if (existing.isPresent) {
            val like = existing.get()
            if (like.type != type) {
                commentLikeRepository.save(like.copy(type = type))
            }
        } else {
            commentLikeRepository.save(
                CommentLike(
                    commentId = commentId,
                    userId = userId,
                    type = type
                )
            )
        }
    }

    fun getCommentLikes(commentId: Long, userId: Long? = null): Map<String, Any> {
        val likes = commentLikeRepository.countByCommentIdAndType(commentId, CommentLikeType.LIKE)
        val dislikes = commentLikeRepository.countByCommentIdAndType(commentId, CommentLikeType.DISLIKE)
        
        val result = mutableMapOf<String, Any>(
            "likes" to likes,
            "dislikes" to dislikes
        )
        
        if (userId != null) {
            val userLike = commentLikeRepository.findByCommentIdAndUserId(commentId, userId)
            if (userLike.isPresent) {
                val likeType = userLike.get().type.name
                result["userLiked"] = likeType == "LIKE"
                result["userDisliked"] = likeType == "DISLIKE"
            } else {
                result["userLiked"] = false
                result["userDisliked"] = false
            }
        }
        
        return result
    }

    @Transactional
    fun updateComment(request: CommentUpdateRequest): CommentResponse {
        val comment = commentRepository.findById(request.commentId)
            .orElseThrow { NoSuchElementException("Comment not found") }
        
        if (comment.userId != request.userId) {
            throw IllegalArgumentException("User can only edit their own comments")
        }
        
        val updated = comment.copy(
            content = request.content,
            isEdited = true,
            updatedAt = Instant.now()
        )
        return commentRepository.save(updated).toResponse()
    }

    @Transactional
    fun deleteUserComment(commentId: Long, userId: Long) {
        val comment = commentRepository.findById(commentId)
            .orElseThrow { NoSuchElementException("Comment not found") }
        
        if (comment.userId != userId) {
            throw IllegalArgumentException("User can only delete their own comments")
        }
        
        commentRepository.delete(comment)
    }

    @Transactional
    fun flagComment(id: Long): CommentResponse {
        val comment = commentRepository.findById(id).orElseThrow { NoSuchElementException("Comment not found") }
        val updated = comment.copy(isFlagged = true)
        return commentRepository.save(updated).toResponse()
    }

    @Transactional
    fun unflagComment(id: Long): CommentResponse {
        val comment = commentRepository.findById(id).orElseThrow { NoSuchElementException("Comment not found") }
        val updated = comment.copy(isFlagged = false)
        return commentRepository.save(updated).toResponse()
    }

    @Transactional
    fun deleteComment(id: Long): CommentResponse {
        val comment = commentRepository.findById(id).orElseThrow { NoSuchElementException("Comment not found") }
        val updated = comment.copy(isDeleted = true)
        return commentRepository.save(updated).toResponse()
    }

    @Transactional
    fun restoreComment(id: Long): CommentResponse {
        val comment = commentRepository.findById(id).orElseThrow { NoSuchElementException("Comment not found") }
        val updated = comment.copy(isDeleted = false)
        return commentRepository.save(updated).toResponse()
    }
}

private fun Comment.toResponse(): CommentResponse = CommentResponse(
    id = id,
    productId = productId,
    userId = userId,
    content = content,
    parentId = parentId,
    isEdited = isEdited,
    updatedAt = updatedAt,
    createdAt = createdAt
) 